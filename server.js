const express = require('express');
const app  = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const RouteUsers = require('./router/register');
const userRoutes = require('./router/password');
const RouterUser = require("./router/user")
const emailRoutes = require('./router/email');
const reservationRoutes = require('./router/reservation');
const adminRouteProduit = require("./router/liste-produit");
const localisationRoutes = require("./router/localisation-resto");



//Erreur CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });


//Connexion base de donnees
// mongoose.connect("mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password")
//   // mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0',
//   // )

//   // mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password',)

//   .then(() => {
//     console.log("connexion success !");
//   })
//   .catch((error) => {
//     console.log("Erreur de connexion");
//   });
// mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://boubacarndiaye:boubacar@route-liste-produit.9hnsns9.mongodb.net/?retryWrites=true&w=majority&appName=Route-liste-produit
//TEST

mongoose.connect("mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  // mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0',
  // )

  // mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password',)

  .then(() => {
    console.log("connexion success !");
  })
  .catch((error) => {
    console.log("Erreur de connexion");
  });


app.use(cors());
app.use(express.json())

app.use(bodyParser.json())
app.use('/users/', RouteUsers);
app.use('/admin/', RouteUsers);
// app.use('/email/', RouteUsers);
app.use('/email', emailRoutes); 

app.use('/passwords', userRoutes);
app.use('/api/users/', RouterUser);
app.use('/api', reservationRoutes);


app.use("/admin", adminRouteProduit);
app.use("/user", adminRouteProduit);
app.use(localisationRoutes);

app.listen(8000, () => {
    console.log(`Serveur en cours d'exécution sur le port 8000`);
});



module.exports = app;