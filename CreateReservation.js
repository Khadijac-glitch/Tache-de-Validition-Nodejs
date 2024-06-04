const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const reservationRoutes = require('./router/reservation');
const createReservation = express();
createReservation.use(bodyParser.json());


mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password',)
    .then(() => console.log('Connexion réussie'))
    .catch(err => console.error('Echec de la connexion', err));
    
    createReservation.use('/api', reservationRoutes);

    createReservation.listen(8080, () => {
    console.log("Server is running on port :8080");
});

