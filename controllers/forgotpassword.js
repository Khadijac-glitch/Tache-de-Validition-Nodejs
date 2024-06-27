const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/register');
const nodemailer = require('nodemailer');

// Configurer le transporteur de mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'passpartoutsn@gmail.com',
    pass: 'afaq ywrb asby baky',
  },
});

// Fonction pour envoyer l'email de réinitialisation
function sendResetEmail(userEmail, token) {
  const resetLink = `http://localhost:3000/forgotpassword?token=${token}`;
  const mailOptions = {
    from: 'passpartoutsn@gmail.com',
    to: userEmail,
    subject: 'Réinitialisation de votre mot de passe',
    html: `Vous pouvez réinitialiser votre mot de passe en suivant : <a href="${resetLink}">${resetLink}</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email de réinitialisation envoyé: ' + info.response);
    }
  });
}

// Contrôleur pour la demande de réinitialisation de mot de passe
const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'Utilisateur non trouvé' }] });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    sendResetEmail(user.email, token);

    return res.status(200).json({ msg: 'Un email de réinitialisation a été envoyé à votre adresse.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Contrôleur pour la réinitialisation du mot de passe
const resetPassword = async (req, res) => {
  // Valider les erreurs de requête
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password, confirmPassword } = req.body;
  const { token } = req.params;

  // Vérifier si les mots de passe correspondent
  if (password !== confirmPassword) {
    return res.status(400).json({ errors: [{ msg: 'Les mots de passe ne correspondent pas' }] });
  }

  try {
    // Décoder le jeton JWT
    const decoded = jwt.verify(token, 'your_jwt_secret');

    // Trouver l'utilisateur par ID
    let user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'Utilisateur non trouvé' }] });
    }

    // Hacher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Sauvegarder l'utilisateur avec le nouveau mot de passe
    await user.save();

    return res.status(200).json({ msg: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    console.error(err.message);
    if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ errors: [{ msg: 'Jeton JWT invalide' }] });
    }
    res.status(500).send('Erreur du serveur');
  }
};
module.exports = {
  forgotPassword,
  resetPassword
};
