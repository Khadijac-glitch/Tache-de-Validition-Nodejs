const express = require('express');
const router = express.Router();
const userController = require('../contollers/password');

router.post('/create-password', userController.createUser);
router.post('/change-password', userController.changePassword);
router.get('/users', userController.getAllUsers);
module.exports = router;