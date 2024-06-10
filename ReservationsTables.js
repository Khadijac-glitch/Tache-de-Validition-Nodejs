const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const Reservation = mongoose.model('Reservation', new mongoose.Schema({
    tableId: {
        type: Number,
        required: true
    },
}));

// Route pour la réservation d'une table
app.post('/api/reservation', async (req, res) => {
  try {
    const { tableId } = req.body;
    
    const existingReservation = await Reservation.findOne({ tableId });
    if (existingReservation) {
      return res.status(400).json({ message: 'Cette table est déjà réservée.' });
    }

    const newReservation = new Reservation({ tableId });
    const savedReservation = await newReservation.save();

    res.status(201).json(savedReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la réservation de la table.' });
  }
});

// Route pour supprimer une réservation
app.delete('/api/reservation/:tableId', async (req, res) => {
    try {
      const { tableId } = req.params;
      
      const existingReservation = await Reservation.findOne({ tableId });
      if (!existingReservation) {
        return res.status(404).json({ message: 'Cette table n\'a pas été réservée.' });
      }
  
      await Reservation.deleteOne({ tableId });
        res.status(200).json({ message: `La réservation de la table ${tableId} a été annulée.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de l\'annulation de la réservation.' });
    }
  });
// Route pour récupérer les tables réservées
app.get('/api/reserved-tables', async (req, res) => {
  try {
    const reservations = await Reservation.find();

    const reservedTables = reservations.map(reservation => reservation.tableId);

    res.status(200).json(reservedTables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des tables réservées.' });
  }
});



mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password',)
    .then(() => console.log('Connexion réussie'))
    .catch(err => console.error('Echec de la connexion', err));

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    