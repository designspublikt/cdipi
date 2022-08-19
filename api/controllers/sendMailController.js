const SendMail = require('../models/SendMail');
let sendMail = new SendMail;
let promiseRes;
let body;

exports.sendmail = (req, res) => {

	body =	`	<p>Nombre: ${req.body.fullname}</p>
					<p>Email: ${req.body.email}</p>
					<p>Message: ${req.body.message}</p>`;

	sendMail.subject = 'Consulta Web';
	sendMail.body = body;

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

exports.sendCouchMail = (req, res) => {

	body =	`	<p>Nombre: ${req.body.firstname} ${req.body.lastname}</p>
					<p>Phone: ${req.body.phone}</p>
					<p>Email: ${req.body.email}</p>
					<p>Message: ${req.body.message}</p>
				`

	sendMail.subject = 'Servicio ' + req.body.topic;
	sendMail.body = body;

	promiseRes = sendMail.sendMail();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Mail Sent Succesfully',
				response
			})
		})
		.catch(error => {
			res.json({
				status: false,
				message: 'Mail Sent Succesfully',
				error
			});
		});

}