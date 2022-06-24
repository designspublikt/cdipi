const express = require('express');
const bodyparser = require('body-parser');
const authMiddleWare = require('./middlewares/auth');
const cors = require('cors');
const app = express();

/* Settings */
	app.use(cors());
	app.use(bodyparser.json());
	app.use(bodyparser.urlencoded({extended: false}));

/* Routes */
	app.get('/', (req, res) => {
		res.redirect('/api');
	});

	app.get('/api', (req, res) => {
		res.send('Bienvenido a la API Centro de Innovación y Desarrollo Integral');
	});

	app.use('/api/auth', require('./routes/auth'));

	app.use('/api/sendmail', require('./routes/sendmail'));

	app.use('/api/articles', require('./routes/articles'));
	app.use('/api/categories', require('./routes/categories'));
	app.use('/api/courses', require('./routes/courses'));
	app.use('/api/videos', require('./routes/videos'));

/* PORT Config */
	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => {
		console.log(`Server on port ${PORT}`);
	});

