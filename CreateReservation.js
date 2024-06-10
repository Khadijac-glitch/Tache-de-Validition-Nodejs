const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const reservationRoutes = require('./router/reservation');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/reservation', reservationRoutes);

mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password',)
    .then(() => console.log('Connexion réussie'))
    .catch(err => console.error('Echec de la connexion', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
