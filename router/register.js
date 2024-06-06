const express  = require('express')
const router = express.Router()
const ProdCtrl = require('../controllers/register');
const PradCtrl = require('../controllers/email');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// User CRUD
<<<<<<< HEAD
router.post('/register',ProdCtrl.createUser);
router.get('/:get-user',ProdCtrl.getOneUser);
router.patch('/patch-user/:id', ProdCtrl.patchUser);
router.delete('/delete-user/:id', ProdCtrl.deleteUser);
=======
// router.post('/predict', ProdCtrl.createUser);
router.post('/register', ProdCtrl.createUser);
router.get('/getting', ProdCtrl.getOneUser);
router.patch('/update/:id', ProdCtrl.patchUser);
router.delete('/delete/:id', ProdCtrl.deleteUser);
>>>>>>> 78e3ede38f423c9667180f7ed2a9868f987d99f2
// Admin CRUD
router.post('/admin-register', ProdCtrl.createAdminUser);
router.patch('/update-admin/:id', ProdCtrl.patchAdmin);
router.delete('/delete-admin/:id', ProdCtrl.deleteAdmin);

// Admin EMAIL
router.post('/email-admin/', PradCtrl.sendEmail);

module.exports = router;