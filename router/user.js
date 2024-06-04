const express = require('express');
const Users = require('../models/user');
const ProdCtrl = require('../controllers/login');
const router = express.Router();

router.post('/login', ProdCtrl.createUser);

module.exports = router;