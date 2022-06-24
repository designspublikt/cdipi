const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');
const env = require('../includes/config');

let auth = new Auth();
let promiseRes;

exports.login = (req, res) => {
	let auth = req.authorization;

	if(!auth) {
		res.json({
			status: false,
			message: 'Authentication Failed',
			error: new Error('There was an error with the authentication process')
		});
	}

	res.json({
		status: true,
		message: 'User Authentication Correct!',
		auth,
		token: req.token,
		user: {
			id: req.userData.id,
			firstname: req.userData.firstname,
			lastname: req.userData.lastname
		}
	});
}
