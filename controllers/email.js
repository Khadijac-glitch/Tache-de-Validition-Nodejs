const mongoose = require("mongoose");
const Send = require('../models/email');
const nodemailer = require('nodemailer');
const User = require("../models/register");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "passpartoutsn@gmail.com",
    pass: "afaq ywrb asby baky",
  },
});

exports.sendEmail = (req, res) => {
  const send = new Send(req.body);
  send()
    .then(() => {
      res.status(200).json({ message: 'Email envoyé avec succès' });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
    });
}

exports.createUser = async (req, res) => {
  const { email } = req.body;

  try {
    // Créer un nouvel utilisateur avec les données de la requête
    const User = new newUser({email});
    // Sauvegarder 
  
    const savedUser = await newUser.save();

    // Configurer les options de l'email
    const mailOptions = {
      from: "passpartoutsn@gmail.com",
      to: savedUser.email,
      subject: "Bienvenue chez TERANGA FOOD!",
      text: `Bonjour ${savedUser.firstName},\n\nMerci de vous abonnez aux news  !\n\nCordialement,\nL'équipe teranga`,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès à " + savedUser.email);

    res.status(200).json({ message: 'Utilisateur enregistré avec succès et email envoyé' });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur ou de l'envoi de l'email:", error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur ou de l\'envoi de l\'email' });
  }
};



















// const mongoose = require("mongoose");
// const Send= require ('../models/email');
// const nodemailer = require('nodemailer');
// const User = require("../models/register");

// const user = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'register' }, 
// });

//  exports.sendEmail = (req,res) =>{
//     const send = new Send(req.body);
//     send()
//     .then(() => {
//       res.status(200).json({ message: 'Email envoyer avec success' });
//     })
//         .catch((err) => {
//        console.error(err.message);
//       res.status(500).json({ message: 'Email error' });
//         })
//  }

//  const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "passpartoutsn@gmail.com",
//     pass: "afaq ywrb asby baky",
//   },
// });

//  user.post("save", async function (doc) {
//   // Configurer les options de l'email
//   const mailOptions = {
//     from: "passpartoutsn@gmail.com",
//     to: doc.email,
//     subject: "Bienvenue chez TERANGA FOOD!",
//     text: `Bonjour ${doc.firstName},\n\nMerci de vous être inscrit!\n\nCordialement,\nL'équipe teranga`,
//   };

//   // Envoyer l'email
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Email envoyé avec succès à " + doc.email);
//   } catch (error) {
//     console.error("Erreur lors de l'envoi de l'email:", error);
//   }
// });

