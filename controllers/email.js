const mongoose = require("mongoose");
const Send= require ('../models/email');
const nodemailer = require('nodemailer');
const User = require("../models/register");

const user = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'register' }, 
});

 exports.sendEmail = (req,res) =>{
    const send = new Send(req.body);
    send()
    .then(() => {
      res.status(200).json({ message: 'Email envoyer avec success' });
    })
        .catch((err) => {
       console.error(err.message);
      res.status(500).json({ message: 'Email error' });
        })
 }


 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "passpartoutsn@gmail.com",
    pass: "afaq ywrb asby baky",
  },
});

 user.post("save", async function (doc) {
  // Configurer les options de l'email
  const mailOptions = {
    from: "passpartoutsn@gmail.com",
    to: doc.email,
    subject: "Bienvenue chez TERANGA FOOD!",
    text: `Bonjour ${doc.firstName},\n\nMerci de vous être inscrit!\n\nCordialement,\nL'équipe teranga`,
  };

  // Envoyer l'email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès à " + doc.email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
});

// user.post("save", async function (doc) {
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