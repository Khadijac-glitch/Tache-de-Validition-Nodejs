const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const GetPassword = express();
const userRoutes = require('./router/password');

mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password')
    .then(() => {
        console.log('Connexion réussie à MongoDB!');
    })
    .catch((error) => {
        console.log('Erreur de connexion à MongoDB:', error);
    });

    GetPassword.use(bodyParser.json());

    GetPassword.use('/user', userRoutes);

    GetPassword.listen(4000,()=>{
        console.log('Server is running at localhost:4000');
    });
    