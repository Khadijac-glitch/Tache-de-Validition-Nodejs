const express = require('express')
const app = express()
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
<<<<<<< HEAD
const RouteUsers = require('./router/connexion');
mongoose.connect('mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
=======
const RouterUser = require("./routes/user")
>>>>>>> f93a65eccdfd7f3bae58447c785b2492fb9a9d88


mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0',{

})
.then(() => {
    console.log('connexion success !')
})
.catch((error) => {
    console.log('Erreur de connexion');
});
app.post('/',(req,res) => {
    res.send('/api/users/')
    console.log("réussi avec succès")
});


app.use(bodyParser.json())
app.use('/api/users/', RouteUsers);
app.use('/api/admin/', RouteUsers);
app.use('/api/email', require('./router/email'));


app.post('/',(req,res) => {
    res.send('/api/users')
    console.log("réussi avec succès")
});


app.use(bodyParser.json())
app.use('/api/users/', RouterUser);


module.exports = app;
