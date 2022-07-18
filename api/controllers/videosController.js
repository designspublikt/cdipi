const Video = require('../models/Video');
let video = new Video();
let promiseRes;

exports.add = (req, res) => {
	video.title = req.body.videoTitle;
	video.desc_short = req.body.videoShortDesc;
	video.desc_long = req.body.videoLongDesc;
	video.src = req.body.videoIdSrc;
	video.image = req.body.videoImage;
	video.category_id = req.body.videoCategory;

	promiseRes = video.add();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Video Added',
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

exports.edit = (req, res) => {
	video.id = req.body.videoId;
	video.title = req.body.videoTitle;
	video.desc_short = req.body.videoShortDesc;
	video.desc_long = req.body.videoLongDesc;
	video.src = req.body.videoIdSrc;
	video.image = req.body.videoImage;
	video.category_id = req.body.videoCategory;

	promiseRes = video.edit();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Video Edited',
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
	video.id = req.params.id;

	promiseRes = video.delete();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Video Deleted',
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

exports.getAll = (req, res) => {
	promiseRes = video.getAll();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get All Videos',
				response
			});
		})
		.catch(error => {
			res.json({
				status: true,
				message: 'There was an error with the query',
				error
			});
		});
}

exports.getAllDesc = (req, res) => {
	promiseRes = video.getAllDesc();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get All Videos Order Desc',
				response
			});
		})
		.catch(error => {
			res.json({
				status: true,
				message: 'There was an error with the query',
				error
			});
		});
}

exports.getById = (req, res) => {
	video.id = req.params.id;

	promiseRes = video.getById();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Video By Id',
				response
			});
		})
		.catch(error => {
			res
		})
}

exports.getByCategoryId = (req, res) => {
	video.category_id = req.params.category;

	promiseRes = video.getByCategoryId();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Videos By Category',
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
	promiseRes = video.getLast();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Last Video',
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

exports.getLastN = (req, res) => {
	video.limit = parseInt(req.params.limit);

	promiseRes = video.getLastN();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Last N Videos',
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

exports.getByTitle = (req, res) => {
	video.title = req.params.title;

	promiseRes = video.getByTitle();

	promiseRes
		.then(response => {
			res.json({
				status: true,
				message: 'Get Videos By Title',
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