const express  = require('express')
const router = express.Router()
const ProdCtrl = require('../controllers/register');
const PradCtrl = require('../controllers/email');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// User CRUD
router.post('/register',ProdCtrl.createUser);
router.get('/:get-user',ProdCtrl.getOneUser);
router.patch('/patch-user/:id', ProdCtrl.patchUser);
router.delete('/delete-user/:id', ProdCtrl.deleteUser);
// Admin CRUD
router.post('/:admin-register', ProdCtrl.createAdminUser);
router.patch('/patch-admin/:id', ProdCtrl.patchAdmin);
router.delete('/delete-admin/:id', ProdCtrl.deleteAdmin);

// Admin EMAIL
router.post('/email-admin/', PradCtrl.sendEmail);

module.exports = router;