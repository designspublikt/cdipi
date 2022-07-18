const con = require('../includes/db_connect');

class Category {
	id= 0;
	name = '';
	icon = '';
	color = '';
	type = '';
	visible = 0;

	add() {
		return new Promise((resolve, reject) => {
			let sql = 'INSERT INTO categories (id, name, icon, color, type, visible) VALUES (?,?,?,?,?,?)';
			con.query(sql, [this.id, this.name, this.icon, this.color, this.type, this.visible], (err, response) => {
				if(err) reject(err);

				resolve(response);
			})
		});
	}

	edit() {
		return new Promise((resolve, reject) => {
			let sql = 'UPDATE categories SET name = ?, icon = ?, color = ?, type = ?, visible = ? WHERE id = ?';
			con.query(sql, [this.name, this.icon, this.color, this.type, this.visible, this.id], (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	delete() {
		return new Promise((resolve, reject) => {
			let sql = 'DELETE FROM categories WHERE id = ?';
			con.query(sql, this.id, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getAll() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT * FROM categories';
			con.query(sql, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getById() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT * FROM categories WHERE id = ?';
			con.query(sql, this.id, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getByType() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT * FROM categories WHERE type = ?';
			con.query(sql, this.type, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getByName() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT * FROM categories WHERE name = ?';
			con.query(sql, this.name, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}

	getLast() {
		return new Promise((resolve, reject) => {
			let sql = 'SELECT * FROM categories ORDER BY id DESC LIMIT 1';
			con.query(sql, (err, response) => {
				if(err) reject(err);

				resolve(response);
			});
		});
	}
}

module.exports = Category;