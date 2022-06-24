const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');
const authMiddleWare = require('../middlewares/auth');

router.get('/', articlesController.getAll);
router.get('/desc', articlesController.getAllDesc);
router.get('/last', articlesController.getLast);
router.get('/last/:limit', articlesController.getLastN);
router.get('/category/:categoryId', articlesController.getByCategoryId);
router.get('/title/:title', articlesController.getByTitle);
router.get('/:id', articlesController.getById);

router.post('/create', [authMiddleWare.verifyToken, articlesController.upload], articlesController.add);

router.put('/edit', [authMiddleWare.verifyToken, articlesController.upload], articlesController.edit);

router.delete('/delete/:id', authMiddleWare.verifyToken, articlesController.delete);

module.exports = router;