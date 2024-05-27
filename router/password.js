const express  = require('express')
const router = express.Router()
const ProdCtrl = require('../contollers/password');


router.post('/', ProdCtrl.createPassword);
router.get('/:prod', ProdCtrl.getOnePassword);
router.get('/', ProdCtrl.getAllPasswords);

module.exports = router;


