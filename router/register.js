const express  = require('express')
const router = express.Router()
const ProdCtrl = require('../controllers/register');
const PradCtrl = require('../controllers/email');

// User CRUD
// router.post('/predict', ProdCtrl.createUser);
router.post('/register', ProdCtrl.createUser);
router.get('/getting', ProdCtrl.getOneUser);
router.patch('/update/:id', ProdCtrl.patchUser);
router.delete('/delete/:id', ProdCtrl.deleteUser);
// Admin CRUD
router.post('/admin-register', ProdCtrl.createAdminUser);
router.patch('/update-admin/:id', ProdCtrl.patchAdmin);
router.delete('/delete-admin/:id', ProdCtrl.deleteAdmin);

// Admin EMAIL
router.post('/email-admin/', PradCtrl.sendEmail);

module.exports = router;