// const jwt = require("jsonwebtoken");
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs'); 
// const User = require("../models/register");
// const nodemailer = require('nodemailer'); // Assurez-vous d'avoir cette importation

// // Controller pour l'inscription d'un nouvel utilisateur
// exports.createUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { firstName, lastName,email,number, password,confirmPassword, role } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ errors: [{ msg: 'Utilisateur existe déjà' }] });
//     }

//     // Crypter le mot de passe
//     const salt = await bcrypt.genSalt(10);
//     const crytPassword = await bcrypt.hash(password, salt);
//     console.log(crytPassword);

//     user = new User({
//       firstName,
//       lastName,
//       email,
//       number,
//       password: crytPassword,
//       confirmPassword,
//       role
//     });

//     await user.save();

//     // Envoyer un e-mail de confirmation
//     await sendConfirmationEmail(email);

//     return res.status(200).json({ msg: 'Inscription réussie' });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Erreur du serveur');
//   }
// };

// // Fonction pour envoyer un e-mail de confirmation
// async function sendConfirmationEmail(email) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth:{
//         user: 'passpartoutsn@gmail.com',
//         pass: 'afaq ywrb asby baky',
//       }
//     });

//     const mailOptions = {
//       from: 'votre_adresse_email@gmail.com',
//       to: email,
//       subject: 'Confirmation d\'inscription',
//       html: '<p>Merci pour votre inscription!</p><p>Votre compte a été créé avec succès.</p>'
//     };

//     await transporter.sendMail(mailOptions);
//     console.log('Email de confirmation envoyé à :', email);
//   } catch (error) {
//     console.error('Erreur lors de l\'envoi de l\'email de confirmation :', error);
//   }
// }


// // CRUD

// exports.createAdminUser = (req, res) => {
//   console.log(req.body);
//   const user = new User(req.body);
//   user.save()
//  .then((utilisateur) => {
//   return res.status(201).json({utilisateur})
//  })
//  .catch((error) => { return res.status(400).json({error}) });
// }
// exports.getOneUser = (req, res) => {
//   const user = req.params.id;
//   console.log(user);
//  User.find({user:user})
//   .then ((utilisateur) =>{
//    return res.status(200).json({utilisateur})} )
//   .catch((error) =>{
//       console.log(error);
//    return res.status(400).json({error}) });
// }

// exports.patchUser = (req, res) => {
//   const user = req.params.id;
//   console.log(user);
//  User.findByIdAndUpdate(user,req.body,{
//       new:true,
//       runValidators:true
//   })
//   .then ((utilisateur) =>{
//       return res.status(200).json({utilisateur})} )
//      .catch((error) =>{
//          console.log(error);
//       return res.status(400).json({error}) });
      
//   }
//   exports.patchAdmin = (req, res) => {
//       const user = req.params.id;
//       console.log(user);
//      User.findByIdAndUpdate(user,req.body,{
//           new:true,
//           runValidators:true
//       })
//       .then ((utilisateur) =>{
//           return res.status(200).json({utilisateur})} )
//          .catch((error) =>{
//              console.log(error);
//           return res.status(400).json({error}) });
//       }
//   exports.deleteUser = (req, res) => {
//       const user = req.params.id;
//       console.log(user);
//      User.findByIdAndDelete(user)
//       .then ((utilisateur) =>{
//           return res.status(200).json({utilisateur})} )
//          .catch((error) =>{
//              console.log(error);
//           return res.status(400).json({error}) });
//       }
//       exports.deleteAdmin = (req, res) => {
//           const user = req.params.id;
//           console.log(user);
//          User.findByIdAndDelete(user)
//           .then ((utilisateur) =>{
//               return res.status(200).json({utilisateur})} )
//              .catch((error) =>{
//                  console.log(error);
//               return res.status(400).json({error}) });
//           }


// Importations nécessaires
const express = require('express');
const router = express.Router();
const User = require('../models/register'); // Assurez-vous d'importer votre modèle User
const nodemailer = require('nodemailer');

// Route pour récupérer les adresses e-mail et envoyer des newsletters
router.post('/sendNewsletter', async (req, res) => {
  try {
    // Récupérer toutes les adresses e-mail des utilisateurs enregistrés dans la base de données
    const users = await User.find({}, 'email');

    // Si aucun utilisateur trouvé, retourner une réponse avec un message approprié
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé dans la base de données' });
    }

    // Envoyer une newsletter à chaque adresse e-mail récupérée
    for (const user of users) {
      await sendNewsletter(user.email);
    }

    return res.status(200).json({ message: 'Newsletters envoyées avec succès à tous les utilisateurs' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi des newsletters :', error);
    return res.status(500).json({ message: 'Erreur lors de l\'envoi des newsletters' });
  }
});

// Fonction pour envoyer une newsletter à une adresse e-mail spécifique
async function sendNewsletter(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'votre_adresse_email@gmail.com',
        pass: 'votre_mot_de_passe',
      },
    });

    const mailOptions = {
      from: 'votre_adresse_email@gmail.com',
      to: email,
      subject: 'Newsletter de Teranga Food',
      html: '<p>Voici la dernière newsletter de Teranga Food!</p><p>Contenu de la newsletter...</p>',
    };

    await transporter.sendMail(mailOptions);
    console.log('Newsletter envoyée avec succès à :', email);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la newsletter :', error);
  }
}

module.exports = router;
