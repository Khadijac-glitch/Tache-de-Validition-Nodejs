const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./router/password');
const GetPassword = express();
GetPassword.use(bodyParser.json());

mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connexion réussie!');
})
.catch((error) => {
  console.error('Erreur de connexion à MongoDB:', error);
});

GetPassword.use('/user', userRoutes);

GetPassword.listen(4000, () => {
  console.log(`Serveur en cours d'exécution sur le port ${4000}`);
});
