const express = require('express');
const userController = require('../controllers/password');
const router = express.Router();

router.post('/create-password', userController.createPassword);
router.post('/change-password', userController.changePassword);
router.post('/admin/change-password', userController.adminChangePassword);

module.exports = router;
