const mongoose = require("mongoose");
const validator = require("validator");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail", // Utilisez le service de votre choix
  auth: {
    user: "passpartoutsn@gmail.com",
    pass: "afaq ywrb asby baky",
  },
});
const user = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error("Email non valide!");
    },
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isLength(v, { min: 4, max: 20 }))
        throw new Error("Le mot de passe doit etre entre 4 et 20 caractères!");
    },
  },
  confirmPassword: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isLength(v, { min: 4, max: 20 }))
        throw new Error("Le mot de passe doit etre entre 4 et 20 caractères!");
    },
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
module.exports = mongoose.model("Register", user);
