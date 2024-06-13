const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const RouteUsers = require('./router/register');
const  getOneUser = require('./router/register');
const emailRoutes = require('./router/email');
const adminRouteProduit = require("./router/liste-produit");
const localisationRoutes = require("./router/localisation-resto");
const newsletterRoutes = require('./router/newletters');

//Connexion base de donnees
// mongoose.connect('mongodb+srv://boubacarndiaye:boubacar@route-liste-produit.9hnsns9.mongodb.net/?retryWrites=true&w=majority&appName=Route-liste-produit')

mongoose.connect('mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',)
// mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0',
// )

// mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password',)

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
app.use('/lo', require('./router/auth'));
app.use('/api/getting', getOneUser);

app.use('/api/admin/', RouteUsers);
app.use('/api/email', emailRoutes);
app.use('/subscribe', newsletterRoutes); 




app.use("/admin", adminRouteProduit);
app.use("/user", adminRouteProduit);
app.use(localisationRoutes);


// app.use('/api/passwords', userRoutes);
// app.use('/api/reservation', reservationRoutes);



app.listen(8080, () => {
    console.log(`Serveur en cours d'exécution sur le port 8080`);
  });



module.exports = app;