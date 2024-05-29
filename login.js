const express = require('express')
const app = express()
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const RouterUser = require("./router/user")


mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0',{

})
.then(() => {
    console.log('connexion success !')
})
.catch((error) => {
    console.log('Erreur de connexion');
});

app.post('/',(req,res) => {
    res.send('/api/users')
    console.log("réussi avec succès")
});


app.use(bodyParser.json())
app.use('/api/users/', RouterUser);


module.exports = app;
