const Article = require('../models/Article');
let article = new Article;
const multer = require('multer');
const fs = require('fs');
const fsP = require('fs').promises;
const path = require('path');
let promiseRes;

let articleImageFolder = path.dirname('../src/assets/img/articles/*');

/* Conifigure Multer */
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, articleImageFolder);
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname);
		}
	});

	const fileFilter = (req, file, cb) => {
		const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];

		if(allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	}

const upload = multer({storage, fileFilter});

exports.upload = upload.single('articleImage');


exports.add = (req, res) => {

	if(req.file) {
		let body = JSON.parse(req.body.articleForm);

		article.id = body.id;
		article.title = body.title;
		article.desc_short = body.desc_short;
		article.desc_long = body.desc_long;
		article.content = body.content;
		article.image = body.image;
		article.category_id = body.category_id;

		promiseRes = article.add();

		promiseRes
			.then(response => {
				res.json({
					status: true,
					message: 'Article Added',
					response
				});
			})
			.catch(error => {
				res.json({
					status: false,
					message: 'There was an error with database query',
					error
				});
			});
	} else {
		res.json({
			status: false,
			message: 'Image was not found or format is invalid',
			error: 'Image file is missing'
		});
	}
}


exports.edit = (req, res) => {
	let body = req.file ? JSON.parse(req.body.articleForm) : req.body;

	article.id = body.id;
	article.title = body.title;
	article.desc_short = body.desc_short;
	article.desc_long = body.desc_long;
	article.content = body.content;
	article.image = body.image;
	article.category_id = body.category_id;

	promiseRes = article.edit();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Article Edited',
				response
			});
		})
		.catch(error => {
			res.json({
				status: false,
				message: 'There was an error with database query',
				error
			});
		});
}


exports.delete = (req, res) => {
	let articleId = req.params.id;

	fs.unlink(articleImageFolder + '/' + articleId + '.jpg', error => {
		if(error) {
			res.json({
				status: false,
				message: 'Error deleting image',
				error
			});
		} else {
			article.id = articleId;

			promiseRes = article.delete();

			promiseRes
				.then(response => {
					res.json({
						status: true,
						message: 'Article Deleted',
						response
					});
				})
				.catch(error => {
					res.json({
						status: false,
						message: 'There was an error with database query',
						error
					});
				});
		}
	});
}


exports.getAll = (req, res) => {
	promiseRes = article.getAll();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get All Articles',
				response
			});
		})
		.catch(error => {
			res.json({
				status: false,
				message: 'There was an error with database query',
				error
			});
		});
}



exports.getAllDesc = (req, res) => {
	promiseRes = article.getAllDesc();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get All Articles Order Desc',
				response
			});
		})
		.catch(error => {
			res.json({
				status: false,
				message: 'There was an error with database query',
				error
			});
		});
}




exports.getById = (req, res) => {
	article.id = req.params.id;
	
	promiseRes = article.getById();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Article By Id',
				response
			});
		})
		.catch(error => {
			res.json({
				status: false,
				message: 'There was an error with database query',
				error
			});
		});
}


exports.getByCategoryId = (req, res) => {
	article.category_id = req.params.categoryId;

	promiseRes = article.getByCategory();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Articles by Category',
				response
			});
		})
		.catch(error => {
			res.json({
				status: false,
				message: 'There was an error with database query',
				error
			});
		});
}


exports.getLast = (req, res) => {
	promiseRes = article.getLast();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Last Article',
				response
			});
		})
		.catch(error => {
			res.json({
				status: false,
				message: 'There was an error with database query',
				error
			});
		});
}


exports.getLastN = (req, res) => {
	article.limit = parseInt(req.params.limit);

	promiseRes = article.getLastN();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Last ' + req.body.limit + ' Articles',
				response
			});
		})
		.catch(error => {
			res.json({
				status: false,
				message: 'There was an error with database query',
				error
			});
		});
}


exports.getByTitle = (req, res) => {
	article.title = req.params.title;

	promiseRes = article.getByTitle();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Articles By Title',
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