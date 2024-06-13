const Reservation = require('../models/Reservation');
const nodemailer = require('nodemailer');

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'passpartoutsn@gmail.com',
    pass: 'afaqywrbasbybaky',
  },
});

// Route pour la confirmation de réservation
const confirmReservation = async (req, res) => {
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
        return res.status(500).send("Erreur lors de l'envoi de l'email de confirmation");
      }
      console.log('Email envoyé : ' + info.response);
      res.status(200).send('Email de confirmation envoyé');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la création de la réservation");
  }
};

module.exports = { confirmReservation };
