const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authMiddleWare = require('../middlewares/auth');

router.get('/', categoriesController.getAll);
router.get('/last', categoriesController.getLast);
router.get('/type/:type', categoriesController.getByType);
router.get('/name/:name', categoriesController.getByName);
router.get('/:id', categoriesController.getById);

router.delete('/delete/:id', authMiddleWare.verifyToken, categoriesController.delete);

router.put('/edit', [authMiddleWare.verifyToken, categoriesController.upload], categoriesController.edit);

router.post('/create', [authMiddleWare.verifyToken, categoriesController.upload], categoriesController.add);

module.exports = router;