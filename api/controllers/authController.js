const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');

let auth = new Auth();
let promiseRes;

exports.login = (req, res) => {

	auth.username = req.body.username;
	auth.password = req.body.password;

	promiseRes = auth.login();

	promiseRes
		.then(response => {
			let SecretKey = 'ruDMtag9Zh$tRTdn1igJ*1iIrOJA@*Y1rqjiuh48juE3kIMt$K';
			let userResponse = {};
			response.map(userRes => userResponse = userRes);

			let userObj = {
				username: userResponse.username,
				password: userResponse.password
			}

			jwt.sign(userObj, SecretKey, {expiresIn: 10800}, (err, tk) => {
				if(err) {
					res.json({
						status: false,
						error: err
					});
				}

				res.json({
					status: true,
					message: 'User Access Correct',
					auth: true,
					token: tk,
					user: {
						id: userResponse.id,
						firstname: userResponse.firstname,
						lastname: userResponse.lastname
					}
				});
			});
		})
		.catch(error => {
			res.json({
				status: false,
				auth: false,
				message: 'User Access Denied',
				error: error.message
			});
		});
}
