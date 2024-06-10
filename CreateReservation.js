const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const reservationSchema = new mongoose.Schema({
    invites: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

const createReservation = async (req, res) => {
    try {
        const { invites, date, hour } = req.body;
        const newReservation = new Reservation({ invites, date: new Date(date), hour });
        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

app.get('/getallreservation', async (req, res) => {
    try {
      const users = await Reservation.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
  });
  
const reservationRoutes = express.Router();
reservationRoutes.post('/', createReservation);

app.use('/api/reservation', reservationRoutes);

mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password',)
    .then(() => console.log('Connexion réussie'))
    .catch(err => console.error('Echec de la connexion', err));
    

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
