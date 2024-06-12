const express  = require('express')
const router = express.Router()
const { check } = require('express-validator');
const ProdCtrl = require('../controllers/register');
const PradCtrl = require('../controllers/email');
const auth = require('../middleware/auth');

// const { authenticateToken, isAdmin } = require('../middleware/auth');


router.post('/',
    [
      check('firstName', 'Veillez entrer votre prenom').not().isEmpty(),
      check('lastName', 'Veillez entrer votre nom').not().isEmpty(),
      check('email', 'Veillez entrer votre email').isEmail(),
      check('number', 'Veillez entrer votre numero').not().isEmpty(),
      check('password', 'Veillez entrer un mot de passe de 6 caractères ou plus').isLength({ min: 6 }),
      check('password', 'Veillez entrer un mot de passe de 6 caractères ou plus').isLength({ min: 6 }),
    //   check('role', 'Veillez entrer votre role').not().isEmpty()
    ],
    ProdCtrl.createUser
  );


router.get('/', ProdCtrl.getOneUser);
router.patch('/update/:id', ProdCtrl.patchUser);
router.delete('/delete/:id', ProdCtrl.deleteUser);
// Admin CRUD
router.post('/admin-register', ProdCtrl.createAdminUser);
router.patch('/update-admin/:id', ProdCtrl.patchAdmin);
router.delete('/delete-admin/:id', ProdCtrl.deleteAdmin);

// Admin EMAIL
router.post('/email-admin/', PradCtrl.sendEmail);

module.exports = router;