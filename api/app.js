const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

/* Settings */
	app.use(cors());
	app.use(bodyparser.json());
	app.use(bodyparser.urlencoded({extended: true}));

/* Routes */
	app.get('/', (req, res) => {
		res.redirect('/api');
	});

	app.get('/api', (req, res) => {
		res.send('Bienvenido a la API Centro de Innovación y Desarrollo Integral');
	});

/* PORT Config */
	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => {
		console.log(`Server on port ${PORT}`);
	});

