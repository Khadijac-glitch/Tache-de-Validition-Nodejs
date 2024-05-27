const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const RouteUsers = require('./router/connexion');
mongoose.connect('mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

.then(() => {
    console.log('connexion success !')
})
.catch((error) => {
    console.log('Erreur de connexion');
});
app.get('/',(req,res) => {
    res.send('/api/users/')
    console.log("réussi avec succès")
});

app.use(bodyParser.json())
app.use('/api/users/', RouteUsers);

module.exports = app;