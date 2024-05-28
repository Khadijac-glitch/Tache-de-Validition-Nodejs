const express  = require('express')
const router = express.Router()
const ProdCtrl = require('../controllers/connexion');
// User CRUD
router.post('/:register', ProdCtrl.createUser);
router.get('/:user', ProdCtrl.getOneUser);
router.patch('/:id', ProdCtrl.patchUser);
router.delete('/:id', ProdCtrl.deleteUser);
// Admin CRUD
router.post('/:register', ProdCtrl.createAdminUser);
router.patch('/:id', ProdCtrl.patchAdmin);
router.delete('/:id', ProdCtrl.deleteAdmin);

module.exports = router;