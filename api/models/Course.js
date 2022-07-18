const con = require('../includes/db_connect');

class Course {
	id = 0;
	title = '';
	desc_long = '';
	desc_short = '';
	image = '';

	add() {

	}

	edit() {

	}

	delete() {

	}

	getAll() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT * FROM courses';
			con.query(sql, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}
}

module.exports = Course;