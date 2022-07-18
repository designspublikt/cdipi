const con = require('../includes/db_connect');

class Video {

	id = 0;
	title = '';
	desc_short = '';
	desc_long = '';
	src = '';
	image = '';
	category_id = 0;
	limit = 1;

	add() {
		return new Promise((resolve, reject) => {
			let sql = 'INSERT INTO videos (title, desc_short, desc_long, src, image, category_id) VALUES (?,?,?,?,?,?)';
			con.query(sql, [this.title, this.desc_short, this.desc_long, this.src, this.image, this.category_id], (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	edit() {
		return new Promise((resolve, reject) => {
			let sql = 'UPDATE videos SET title = ?, desc_short = ?, desc_long = ?, src = ?, image = ?, category_id = ? WHERE id = ?';
			con.query(sql, [this.title, this.desc_short, this.desc_long, this.src, this.image, this.category_id, this.id], (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	delete() {
		return new Promise((resolve, reject) => {
			let sql = 'DELETE FROM videos WHERE id = ?';
			con.query(sql, this.id, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getAll() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT videos.*, videos.id AS id_video,  categories.*, categories.id AS id_category, categories.name AS category_name, categories.icon AS category_icon, categories.color AS category_color, categories.type AS category_type, categories.visible AS category_visible FROM videos, categories WHERE videos.category_id = categories.id';
			con.query(sql, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getAllDesc() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT videos.*, videos.id AS id_video,  categories.*, categories.id AS id_category, categories.name AS category_name, categories.icon AS category_icon, categories.color AS category_color, categories.type AS category_type, categories.visible AS category_visible FROM videos, categories WHERE videos.category_id = categories.id ORDER BY videos.id DESC';
			con.query(sql, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getById() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT videos.*, videos.id AS id_video,  categories.*, categories.id AS id_category, categories.name AS category_name, categories.icon AS category_icon, categories.color AS category_color, categories.type AS category_type, categories.visible AS category_visible FROM videos, categories WHERE videos.category_id = categories.id AND videos.id = ?';
			con.query(sql, this.id, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getByCategoryId() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT videos.*, videos.id AS id_video,  categories.*, categories.id AS id_category, categories.name AS category_name, categories.icon AS category_icon, categories.color AS category_color, categories.type AS category_type, categories.visible AS category_visible FROM videos, categories WHERE videos.category_id = categories.id AND videos.category_id = ?';
			con.query(sql, this.category_id, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getLast() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT videos.*, videos.id AS id_video,  categories.*, categories.id AS id_category, categories.name AS category_name, categories.icon AS category_icon, categories.color AS category_color, categories.type AS category_type, categories.visible AS category_visible FROM videos, categories WHERE videos.category_id = categories.id ORDER BY videos.id DESC LIMIT 1';
			con.query(sql, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getLastN() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT videos.*, videos.id AS id_video,  categories.*, categories.id AS id_category, categories.name AS category_name, categories.icon AS category_icon, categories.color AS category_color, categories.type AS category_type, categories.visible AS category_visible FROM videos, categories WHERE videos.category_id = categories.id ORDER BY videos.id DESC LIMIT ?';
			con.query(sql, this.limit, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getByTitle() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT videos.*, videos.id AS id_video,  categories.*, categories.id AS id_category, categories.name AS category_name, categories.icon AS category_icon, categories.color AS category_color, categories.type AS category_type, categories.visible AS category_visible FROM videos, categories WHERE videos.category_id = categories.id AND videos.title LIKE "%"?"%" ORDER BY videos.id DESC';
			con.query(sql, this.title, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}
}

module.exports = Video;