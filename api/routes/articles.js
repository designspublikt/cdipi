const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');

router.get('/', articlesController.getAll);
router.get('/desc', articlesController.getAllDesc);
router.get('/last', articlesController.getLast);
router.get('/last/:limit', articlesController.getLastN);
router.get('/category/:categoryId', articlesController.getByCategoryId);
router.get('/title/:title', articlesController.getByTitle);
router.get('/:id', articlesController.getById);

router.post('/create', articlesController.upload, articlesController.add);

router.put('/edit',  articlesController.upload, articlesController.edit);

router.delete('/delete/:id', articlesController.delete);

module.exports = router;