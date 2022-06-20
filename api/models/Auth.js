const con = require('../includes/db_connect');
const bcrypt = require('bcryptjs');

class Auth {
	
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	login() {
		return new Promise((resolve, reject) => {
			let passwordHsh = '';
			let sql = 'SELECT * FROM users WHERE username = ?';
			con.query(sql, this.username, (err, response) => {
				if(err) reject(err);

				if(Array.isArray(response) && response.length < 1) {
					reject(new Error('User doesn\'t exist'));
				}else {
					passwordHsh = response[0].password;
				}

				let verifyPassword = bcrypt.compareSync(this.password, passwordHsh);

				if(!verifyPassword) {
					reject(new Error('User doesn\'t exist or wrong credentials'));
				}

				resolve(response);
			});
		});
	}
}

module.exports = Auth;