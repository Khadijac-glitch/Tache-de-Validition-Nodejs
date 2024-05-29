const express = require('express');
const userController = require('../contollers/password');
const router = express.Router();

router.post('/create-password', userController.createPassword);
router.patch('/change-password', userController.changePassword); 
router.patch('/admin-change-password', userController.adminChangePassword); 
router.get('/users', userController.getAllUsers);

module.exports = router;
