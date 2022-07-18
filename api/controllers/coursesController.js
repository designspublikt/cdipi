const Course = require('../models/Course');
const course = new Course;
let promiseRes;

exports.add = (req, res) => {
	
}
exports.edit = (req, res) => {

}
exports.delete = (req, res) => {

}
exports.getAll = (req, res) => {
	promiseRes = course.getAll();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get All Courses',
				response
			});
		})
		.catch(error => {
			res.json({
				status: false,
				message: 'There was an error with the query',
				error
			});
		});
}