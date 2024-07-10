

const nodemailer = require('nodemailer');
const Reservation = require('../models/reservation-table');
const { emailUser, emailPass } = require('../config');

const checkIfTableReserved = async (roomId, tableId, date, hour) => {
  const reservation = await Reservation.findOne({ roomId, tableId, date, hour });
  return reservation !== null;
};

const saveReservation = async (reservation) => {
  const newReservation = new Reservation(reservation);
  await newReservation.save();
  return newReservation;
};




const createReservation = async (req, res) => {
  const { invites, date, hour, firstName, lastName, email, mobileNumber, roomId, tableId, specialRequests } = req.body;

  try {
    const isReserved = await checkIfTableReserved(roomId, tableId, date, hour);
    if (isReserved) {
      return res.status(400).json({ message: "Cette table a déjà été réservée." });
    }

    const reservation = await saveReservation({
      invites,
      date,
      hour,
      firstName,
      lastName,
      email,
      mobileNumber,
      roomId,
      tableId,
      specialRequests,
    });

    const html = `
    <div style="display: flex; justify-content: center; align-items: center; height: 320px;background-color: #f8f9fa;">
        <div style="margin: auto; width:730px">
            <div style=" padding: 20px; background-color: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px; max-width: 600px; text-align: left;">
                <p style="color: black; font-size:16px">Bonjour ${firstName} ${lastName},</p>
                <p style="color: black;font-size:16px">Nous avons le plaisir de confirmer votre réservation du ${date} à ${hour} pour ${invites} invités.</p>
                <p style="color: black;font-size:16px">Votre numéro de table est ${tableId} dans la salle ${roomId}. Commentaires: ${specialRequests}</p>
                <p style="color: black;font-size:16px">À très bientôt!</p>
            </div>
        </div>
    </div>
    `
          const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'passpartoutsn@gmail.com',
        pass: 'afaq ywrb asby baky',

      },
    });

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: ' Confirmation de la Réservation ',
      html:html
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail:", error);
        return res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail de confirmation" });
      } else {
        console.log('Email envoyé:', info.response);
        res.status(200).json({ message: "Un email de Confirmation a été envoyé avec succés" });
      }
    });
  } catch (error) {
    console.error('Erreur de gestion de la réservation:', error);
    res.status(500).json({ message: "une erreur s'est produite lors du traitement de votre réservation." });
  }
};

    const deleteReservation = async (req, res) => {

    try {
        const { tableId } = req.params;
        
        const existingReservation = await Reservation.findOne({ tableId });
        if (!existingReservation) {
            return res.status(301).json({ message: 'Cette table n\'a pas été réservée.' });
        }
    
        await Reservation.deleteOne({ tableId });
        res.status(201).json({ message: `La réservation de la table ${tableId} a été annulée.` });
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Une erreur est survenue lors de l\'annulation de la réservation.' });
    }
};
const getReservedTables = async (req, res) => {

    try {
      const reservations = await Reservation.find({}, 'roomId tableId');
      res.status(200).json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des tables réservées.' });
    }
  };
  
  module.exports = {
    createReservation,
    deleteReservation,
    getReservedTables
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  