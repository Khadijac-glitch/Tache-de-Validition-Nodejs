const express = require('express');
const app  = express();
// const connectDB = require('./config/db');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const RouteUsers = require('./router/register');
const userRoutes = require('./router/password');
// const RouterUser = require("./router/user")
const emailRoutes = require('./router/email');
const reservationRoutes = require('./router/reservation');
const localisationRoutes = require("./router/localisation-resto");

//Swagger
const { swaggerUi, swaggerSpec} = require('./swagger')

const adminRouteProduit = require("./router/liste-produit");


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route pour avoir la documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const produitRoutes = require("./router/liste-produit");

//Connexion base de donnees
// mongoose.connect('mongodb+srv://boubacarndiaye:boubacar@route-liste-produit.9hnsns9.mongodb.net/?retryWrites=true&w=majority&appName=Route-liste-produit')
const predictRoutes = require('./router/predict');


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





//TEST

// mongoose.connect("mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//   // mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0',
//   // )

//   // mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password',)

//   .then(() => {
//     console.log("connexion success !");
//   })
//   .catch((error) => {
//     console.log("Erreur de connexion");
//   });





app.use('/api/register', RouteUsers);
app.use('/api/auth', require('./router/auth'));
// app.use('/api/forguotPassword', require('./routes/forguotPassword'));
app.use('/api/admin/', RouteUsers);
app.use('/api/email', emailRoutes); 


app.use("/admin", adminRouteProduit);
app.use("/user", adminRouteProduit);
app.use(localisationRoutes);


app.use('/api/passwords', userRoutes);
app.use('/api/reservation', reservationRoutes);
app.use("/admin", produitRoutes); //test


// Redirection de la racine vers /api-docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;