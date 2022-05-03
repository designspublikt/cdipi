const mysql = require('mysql2');

let db = mysql.createPool({
	host: '162.251.80.27',
	user: 'innovvau_cdipi22',
	password: 'uIxi#^^Tb8rsXU4GG9&xMz^Qt',
	database: 'innovvau_cdipi'
});

db.getConnection((err, con) => {
	if(err) console.log(err);

	if(con) {
		con.release();
		console.log('DB Connected');
	}
});

module.exports = db;