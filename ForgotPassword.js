const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password',{
    useNewUrlParser: true,
  useUnifiedTopology: true,

})
    .then(() => console.log('Connexion réussie'))
    .catch(err => console.error('Echec de la connexion', err));


const ForgotPasswordSchema = new mongoose.Schema({
  email: String,
  resetToken: String,
  resetTokenExpiration: Date,
});

const TokenSchema = new mongoose.Schema({
  token: String,
  email: String,
  expiration: Date,
});

const ForgotPassword = mongoose.model('ForgotPassword', ForgotPasswordSchema);
const Token = mongoose.model('Token', TokenSchema);

function generateUniqueToken() {
  return crypto.randomBytes(32).toString('hex');
}

function sendResetPasswordEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'passpartoutsn@gmail.com',
        pass: 'afaq ywrb asby baky',
    },
  });

  const resetLink = `http://localhost:3000/recover?token=${token}`;
  const mailOptions = {
    // from: 'madjiguened835@gmail.com',

    to: email,
    subject: 'Password Reset',
    text: `Click this link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

app.post('/create',async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).send('Le nom d\'utilisateur et le mot de passe sont requis');
      }
  
      const user = new ForgotPassword({ email });
  
      await user.save();
      res.status(201).send('Utilisateur créé avec succès');
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).send('L email d\'utilisateur existe déjà');
      }
      res.status(500).send('Erreur lors de la création de l\'utilisate');
    }
  })
  

// Route pour demander la réinitialisation du mot de passe
app.post('/request-reset', async (req, res) => {
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
});  

// Route réinitialiser mon mot de passe

    app.post('/reset-password/:token', async (req, res) => {
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
      });


// Récupérer tous les mails 
      app.get('/getallmail', async (req, res) => {
        try {
          const users = await ForgotPassword.find();
          res.status(200).json(users);
        } catch (error) {
          res.status(500).send('Erreur lors de la récupération des utilisateurs');
        }
      });
      
      
      app.listen(3030, () => {
        console.log("Server is running on port :3030");
    });


