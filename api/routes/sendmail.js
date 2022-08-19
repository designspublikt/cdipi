const express = require('express');
const router = express.Router();
const sendMailController = require('../controllers/sendMailController');

router.post('/send', sendMailController.sendmail);
router.post('/sendcoaching', sendMailController.sendCouchMail);

module.exports = router;