const con = require('../includes/db_connect');

class Article {

	id = null;
	title = '';
	desc_short = '';
	desc_long = '';
	content = '';
	image = '';
	category_id = '';
	limit = 1;

	add() {
		return new Promise((resolve, reject) => {
			let sql = 'INSERT INTO articles (id, title, desc_short, desc_long, content, image, category_id) VALUES (?,?,?,?,?,?,?)';
			con.query(sql, [this.id, this.title, this.desc_short, this.desc_long, this.content, this.image, this.category_id], (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	edit() {
		return new Promise((resolve, reject) => {
			let sql = 'UPDATE articles SET title = ?, desc_short = ?, desc_long = ?, content = ?, image = ?, category_id = ? WHERE id = ?';
			con.query(sql, [this.title, this.desc_short, this.desc_long, this.content, this.image, this.category_id, this.id], (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	delete() {
		return new Promise((resolve, reject) => {
			let sql = 'DELETE FROM articles WHERE id = ?';
			con.query(sql, this.id, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getAll() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT articles.id as id_article, articles.title, articles.desc_short, articles.desc_long, articles.content, articles.image, articles.category_id as id_article_category, categories.id as id_category, categories.name as category_name, categories.icon as category_icon, categories.color as category_color, categories.type as category_type, categories.visible as category_visible FROM articles, categories WHERE articles.category_id = categories.id';
			con.query(sql, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getAllDesc() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT articles.id as id_article, articles.title, articles.desc_short, articles.desc_long, articles.content, articles.image, articles.category_id as id_article_category, categories.id as id_category, categories.name as category_name, categories.icon as category_icon, categories.color as category_color, categories.type as category_type, categories.visible as category_visible FROM articles, categories WHERE articles.category_id = categories.id ORDER BY articles.id DESC';
			con.query(sql, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getById() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT articles.id as id_article, articles.title, articles.desc_short, articles.desc_long, articles.content, articles.image, articles.category_id as id_article_category, categories.id as id_category, categories.name as category_name, categories.icon as category_icon, categories.color as category_color, categories.type as category_type, categories.visible as category_visible FROM articles, categories WHERE articles.category_id = categories.id AND articles.id = ?';
			con.query(sql, this.id, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getByCategory() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT articles.id as id_article, articles.title, articles.desc_short, articles.desc_long, articles.content, articles.image, articles.category_id as id_article_category, categories.id as id_category, categories.name as category_name, categories.icon as category_icon, categories.color as category_color, categories.type as category_type, categories.visible as category_visible FROM articles, categories WHERE articles.category_id = categories.id AND articles.category_id = ?';
			con.query(sql, this.category_id, (err, response) => {
				if(err) reject(err);
				
				resolve(response);
			});
		});
	}

	getLast() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT articles.id as id_article, articles.title, articles.desc_short, articles.desc_long, articles.content, articles.image, articles.category_id as id_article_category, categories.id as id_category, categories.name as category_name, categories.icon as category_icon, categories.color as category_color, categories.type as category_type, categories.visible as category_visible FROM articles, categories WHERE articles.category_id = categories.id ORDER BY articles.id DESC LIMIT 1';
			con.query(sql, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getLastN() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT articles.id as id_article, articles.title, articles.desc_short, articles.desc_long, articles.content, articles.image, articles.category_id as id_article_category, categories.id as id_category, categories.name as category_name, categories.icon as category_icon, categories.color as category_color, categories.type as category_type, categories.visible as category_visible FROM articles, categories WHERE articles.category_id = categories.id ORDER BY articles.id DESC LIMIT ?';
			con.query(sql, this.limit, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getByTitle() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT articles.id as id_article, articles.title, articles.desc_short, articles.desc_long, articles.content, articles.image, articles.category_id as id_article_category, categories.id as id_category, categories.name as category_name, categories.icon as category_icon, categories.color as category_color, categories.type as category_type, categories.visible as category_visible FROM articles, categories WHERE articles.category_id = categories.id AND articles.title LIKE "%"?"%" ORDER BY articles.id DESC';
			con.query(sql, this.title, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}
}

module.exports = Article;