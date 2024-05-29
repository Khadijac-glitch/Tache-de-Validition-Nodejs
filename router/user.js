const express = require('express');
const User = require('../models/user');
const router = express.Router();
const ProdCtrl = require('../controllers/user');

router.post('/login', ProdCtrl.createUser);
router.get('/:login-user', ProdCtrl.getOneUser);

module.exports = router;