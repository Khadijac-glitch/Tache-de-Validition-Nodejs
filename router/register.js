const express  = require('express')
const router = express.Router()
const ProdCtrl = require('../controllers/register');
// const express = require('express');
const userController = require('../controllers/password');
// User CRUD
router.post('/register', ProdCtrl.createUser);
router.get('/:get-user', ProdCtrl.getOneUser);
router.patch('/patch-user/:id', ProdCtrl.patchUser);
router.delete('/delete-user/:id', ProdCtrl.deleteUser);
// Admin CRUD
router.post('/:admin-register', ProdCtrl.createAdminUser);
router.patch('/patch-admin/:id', ProdCtrl.patchAdmin);
router.delete('/delete-admin/:id', ProdCtrl.deleteAdmin);

module.exports = router; 