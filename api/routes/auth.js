const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth');
const authController = require('../controllers/authController');

router.post('/login', authMiddleWare.signIn, authController.login);

module.exports = router;