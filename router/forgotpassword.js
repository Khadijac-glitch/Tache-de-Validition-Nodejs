const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/forgotpassword');
const { check } = require('express-validator');
const router = express.Router();

router.post('/forgot-password', [
  check('email', 'Veuillez fournir un email valide').isEmail()
], forgotPassword);

router.post('/reset-password/:token', [
  check('password', 'Le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 }),
  check('confirmPassword', 'Les mots de passe doivent correspondre').custom((value, { req }) => value === req.body.password)
], resetPassword);

module.exports = router;


// /**
//  * @swagger
//  * /api/create:
//  *   post:
//  *     summary: Créer un utilisateur
//  *     description: Endpoint pour créer un nouvel utilisateur
//  *     consumes:
//  *       - application/json
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - in: body
//  *         name: user
//  *         description: Informations de l'utilisateur à créer
//  *         schema:
//  *           type: object
//  *           properties:
//  *             email:
//  *               type: string
//  *               format: email
//  *               example: user@example.com
//  *     responses:
//  *       201:
//  *         description: Utilisateur créé avec succès
//  */
// router.post('/create', forgotPasswordController.createUser);


/**
 * @swagger
 * /api/request-reset:
 *   post:
 *     summary: Demander une réinitialisation de mot de passe
 *     description: Endpoint pour demander une réinitialisation de mot de passe
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: request
 *         description: Informations pour demander une réinitialisation de mot de passe
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: user@example.com
 *     responses:
 *       200:
 *         description: Demande de réinitialisation envoyée avec succès
 */
// router.post('/create', forgotPasswordController.createUser);
// router.post('/request-reset', forgotPasswordController.requestReset);
// 
/**
 * @swagger
 * /api/reset-password/{token}:
 *   post:
 *     summary: Réinitialiser le mot de passe
 *     description: Endpoint pour réinitialiser le mot de passe
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         type: string
 *         description: Jeton de réinitialisation de mot de passe
 *       - in: body
 *         name: reset
 *         description: Informations pour réinitialiser le mot de passe
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               example: newpassword123
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès
 */
// router.post('/reset-password/:token', forgotPasswordController.resetPassword);

/**
 * @swagger
 * /api/getallmail:
 *   get:
 *     summary: Obtenir tous les emails
 *     description: Endpoint pour obtenir la liste de tous les emails
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Liste de tous les emails
 */
// router.get('/getallmail', forgotPasswordController.getAllEmails);




