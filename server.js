const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const RouteUsers = require('./router/register');
// const userRoutes = require('./router/password');
// const RouterUser = require("./router/user")
const emailRoutes = require('./router/email');
// const reservationRoutes = require('./router/reservation');
const adminRouteProduit = require("./router/liste-produit");
const localisationRoutes = require("./router/localisation-resto");

//Connexion base de donnees
// mongoose.connect('mongodb+srv://boubacarndiaye:boubacar@route-liste-produit.9hnsns9.mongodb.net/?retryWrites=true&w=majority&appName=Route-liste-produit')

mongoose.connect('mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',)

.then(() => {
    console.log('connexion success !')
})
.catch((error) => {
    console.log('Erreur de connexion');
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

app.use('/api/register', RouteUsers);
app.use('/api/auth', require('./router/auth'));
app.use('/api/admin/', RouteUsers);
app.use('/api/email', emailRoutes); 


app.use("/admin", adminRouteProduit);
app.use("/user", adminRouteProduit);
app.use(localisationRoutes);


// app.use('/api/passwords', userRoutes);
// app.use('/api/reservation', reservationRoutes);



app.listen(8080, () => {
    console.log(`Serveur en cours d'exécution sur le port 8080`);
  });



module.exports = app;