const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');
const env = require('../includes/config');

let auth = new Auth;
let promiseRes;


exports.signIn = (req, res, next) => {

	auth.username = req.body.username;
	auth.password = req.body.password;

	promiseRes = auth.login();

	promiseRes
		.then(response => {
			let SecretKey = env.SecretKeyJwt;
			let userResponse = {};
			response.map(userRes => userResponse = userRes);

			let userObj = {
				username: userResponse.username,
				password: userResponse.password
			}

			jwt.sign(userObj, SecretKey, {expiresIn: 10800}, (error, tk) => {
				if(error) {
					req.authorization = false;
					res.json({
						status: false,
						message: 'Error while creating token',
						error
					});
					next();
				}

				req.userData = response;
				req.token = tk;
				req.authorization = true;
				next();
			});

		})
		.catch(error => {
			req.authorization = false;
			res.json({
				status: false,
				message: 'Error while login',
				error: error
			})
			next();
		});
}


exports.verifyToken = (req, res, next) => {

	const token = req.headers['authorization-token'];

	if(typeof(token) == undefined || token == 'false') {
		res.json({
			status: false,
			message: 'Invalid Token',
			error: new Error('Authentication Token is not valid')
		});
	}

	try {
		const decoded = jwt.verify(token, env.SecretKeyJwt);
		next();
	} catch (error) {
		res.json({
			status: false,
			message: 'Error while verifying auth token',
			error
		});
	}
}