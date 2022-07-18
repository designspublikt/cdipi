const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');
const authMiddleWare = require('../middlewares/auth');

router.get('/', videosController.getAll);
router.get('/desc', videosController.getAll);
router.get('/last', videosController.getLast);
router.get('/last/:limit', videosController.getLastN);
router.get('/category/:category', videosController.getByCategoryId);
router.get('/title/:title', videosController.getByTitle);
router.get('/:id', videosController.getById);

router.delete('/delete/:id', authMiddleWare.verifyToken, videosController.delete);

router.put('/edit', authMiddleWare.verifyToken, videosController.edit);

router.post('/add', authMiddleWare.verifyToken, videosController.add);

module.exports = router;