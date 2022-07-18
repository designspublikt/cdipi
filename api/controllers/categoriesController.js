const Category = require('../models/Category');
const ftp = require('ftp');
const multer = require('multer');
const ftpStorage = require('multer-ftp');
const fs = require('fs');
const fsP = fs.promises;
const path = require('path');
let category = new Category();
let promiseRes;

let categoryIconsFolder = fs.existsSync(path.dirname('../src/assets/img/categories/*')) ? path.dirname('../src/assets/img/categories/*') : path.dirname('/assets/img/categories/*');

/* Configure Multer */
	// const storage = multer.diskStorage({
	// 	destination: (req, file, cb) => {
	// 		cb(null, categoryIconsFolder);
	// 	},
	// 	filename: (req, file, cb) => {
	// 		cb(null, file.originalname);
	// 	}
	// });

	const ftpClient = new ftp();

	ftpClient.connect({
		port: 21,
		host: '162.251.80.27',
		user: 'cdipi@innovacion2.com',
		password: 'CanQue@2022'
	});

	const storage = new ftpStorage({
		basepath: categoryIconsFolder,
		connection: ftpClient,
		destination: (req, file, options, cb) => {
			cb(null, categoryIconsFolder + '/' + file.originalname)
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

exports.upload = upload.single('iconCategory');

exports.add = (req, res) => {

	if(req.file) {
		let body = JSON.parse(req.body.formCategory);

		ftpClient.site(`chmod 0777 ${categoryIconsFolder}/${body.categoryIcon}`, (err, res)=> {
			if(err) console.log(err);
			console.log(res);
		});

		category.id = body.categoryId;
		category.name = body.categoryName;
		category.icon = body.categoryIcon;
		category.color = body.categoryColor;
		category.type = body.categoryType;
		category.visible = body.categoryVisible;
	
		promiseRes = category.add();

	
		promiseRes
			.then(response => {
				res.json({
					status: true,
					message: 'Category Added',
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
	} else {
		res.json({
			status: false,
			message: 'Image was not valid or doesnt exist',
			error: 'There is an error with the format image'
		});
	}
}

exports.edit = (req, res) => {

	let body = req.file ? JSON.parse(req.body.formCategory) : req.body;

	category.id = body.categoryId;
	category.name = body.categoryName;
	category.icon = body.categoryIcon;
	category.color = body.categoryColor;
	category.type = body.categoryType;
	category.visible = body.categoryVisible;

	promiseRes = category.edit();


	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Category Edited',
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

exports.delete = (req, res) => {



	let idCategory = req.params.id;

	/* LOCALHOST */
	// fs.unlink(categoryIconsFolder + '/' + idCategory + '.png', error => {
	// 	if(error) {
	// 		res.json({
	// 			status: false,
	// 			message: 'Error removing category image',
	// 			error
	// 		});

	// 	} else {
	// 		category.id = idCategory;

	// 		promiseRes = category.delete();

	// 		promiseRes
	// 			.then(response => {
	// 				res.json({
	// 					status: true,
	// 					message: 'Category Deleted',
	// 					response
	// 				});
	// 			})
	// 			.catch(error => {
	// 				res.json({
	// 					status: false,
	// 					message: 'There was a error with the query',
	// 					error
	// 				});
	// 			});
	// 	}
	// });
	

	/* REMOTE SERVER FTP */
	ftpClient.delete(`${categoryIconsFolder}/${idCategory}.png`, (error) => {
		if(error) {
			res.json({
				status: false,
				message: 'Error removing category icon',
				error
			});
		} else {
			category.id = idCategory;

			promiseRes = category.delete();


			promiseRes
				.then(response => {
					res.json({
						status: true,
						message: 'Category Deleted',
						response
					});
				})
				.catch(error => {
					res.json({
						status: false,
						message: 'There was a error with the query',
						error
					});
				});
		}
	});
}

exports.getAll = (req, res) => {
	promiseRes = category.getAll();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get All Categories',
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

exports.getByType = (req, res) => {
	category.type = req.params.type;

	promiseRes = category.getByType();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Categories by Type',
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

exports.getById = (req, res) => {
	category.id = req.params.id;

	promiseRes = category.getById();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Category By Id',
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

exports.getByName = (req, res) => {
	category.name = req.params.name;

	promiseRes = category.getByName();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Category By Name',
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

exports.getLast = (req, res) => {
	promiseRes = category.getLast();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Last Category',
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