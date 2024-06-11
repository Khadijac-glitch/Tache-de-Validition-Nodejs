const express = require('express');
const forgotPasswordController = require('../controllers/forgotpassword');

const router = express.Router();

router.post('/create', forgotPasswordController.createUser);
router.post('/request-reset', forgotPasswordController.requestReset);
router.post('/reset-password/:token', forgotPasswordController.resetPassword);
router.get('/getallmail', forgotPasswordController.getAllEmails);

module.exports = router;
