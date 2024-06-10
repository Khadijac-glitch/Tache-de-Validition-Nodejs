require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Reservation = require('./models/Reservation');
const { getMaxListeners } = require('nodemailer/lib/xoauth2');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});


// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'passpartoutsn@gmail.com',
    pass:' afaq ywrb asby baky',
  },
});

// Route pour la confirmation de réservation
app.post('/confirm-reservation', async (req, res) => {
  const { email, reservationDetails } = req.body;

  if (!email || !reservationDetails) {
    return res.status(400).send('Email and reservation details are required');
  }

  try {
    // Créer une nouvelle réservation
    const reservation = new Reservation({ email, reservationDetails });
    await reservation.save();

    // Envoyer l'email de confirmation
    const mailOptions = {
      from: 'passpartoutsn@gmail.com',
      to: 'sagna996@gmail.com',
      subject: 'Confirmation de réservation',
      text: `Votre réservation a été confirmée. Détails : ${reservationDetails}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Erreur lors de l\'envoi de l\'email');
      }
      console.log('Email envoyé : ' + info.response);
      res.status(200).send('Email de confirmation envoyé');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la création de la réservation');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});