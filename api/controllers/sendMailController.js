const SendMail = require('../models/SendMail');
let sendMail = new SendMail;
let promiseRes;

exports.sendmail = (req, res) => {

	sendMail.fullname = req.body.fullname;
	sendMail.email = req.body.email;
	sendMail.message = req.body.message;

	promiseRes = sendMail.sendMail();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Main Sent Succesfully',
				response
			});
		})
		.catch(error => {
			res.json({
				status: false,
				message: 'Error Sending Mail',
				error
			});
		});
}