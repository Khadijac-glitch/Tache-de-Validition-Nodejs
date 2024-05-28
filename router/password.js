const express  = require('express')
const router = express.Router()
const ProdCtrl = require('../contollers/password');


router.post('/', ProdCtrl.createNewPassword);
router.get('/:users', ProdCtrl.getAllPassword);
router.patch('/:id', ProdCtrl.patchPassword);



module.exports = router;


