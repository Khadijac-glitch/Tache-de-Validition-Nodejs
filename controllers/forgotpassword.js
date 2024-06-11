const ForgotPassword = require('../models/ForgotPassword');
const Token = require('../models/Token');
const generateUniqueToken = require('../utils/generateToken');
const sendResetPasswordEmail = require('../utils/nodemailer');

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send('L\'email est requis');
    }
    const user = new ForgotPassword({ email });
    await user.save();
    res.status(201).send('Utilisateur créé avec succès');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send('L\'email existe déjà');
    }
    res.status(500).send('Erreur lors de la création de l\'utilisateur');
  }
};

exports.requestReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await ForgotPassword.findOne({ email });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    const token = generateUniqueToken();
    await Token.create({ token, email, expiration: Date.now() + 3600000 }); // 1 heure d'expiration
    sendResetPasswordEmail(email, token);
    res.status(200).send('E-mail de réinitialisation de mot de passe envoyé avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const tokenDoc = await Token.findOne({ token, expiration: { $gt: Date.now() } });
    if (!tokenDoc) {
      return res.status(400).send('Token invalide ou expiré');
    }
    const user = await ForgotPassword.findOne({ email: tokenDoc.email });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    user.password = password; 
    await user.save();
    await Token.deleteOne({ token });
    res.status(200).send('Mot de passe réinitialisé avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }
};

exports.getAllEmails = async (req, res) => {
  try {
    const users = await ForgotPassword.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
};
