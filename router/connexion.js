const express  = require('express')
const router = express.Router()
const ProdCtrl = require('../controllers/connexion');

router.post('/', ProdCtrl.createUser);
router.get('/:user', ProdCtrl.getOneUser);
router.patch('/user/:id', ProdCtrl.patchUser);
router.delete('/user/:id', ProdCtrl.deleteUser);

module.exports = router;