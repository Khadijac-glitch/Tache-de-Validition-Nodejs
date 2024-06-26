const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const RouteUsers = require('./router/register');
// const userRoutes = require('./router/password');
// const RouterUser = require("./router/user")
const emailRoutes = require('./router/email');
const reservation = require('./router/reservation');
const adminRouteProduit = require("./router/liste-produit");
const localisationRoutes = require("./router/localisation-resto");

//Forgot password
const forgotPasswordRoutes = require("./router/forgotpassword");

//Reservation table
const reservationRoutes = require("./router/reservation-table");



// const reservationRoutes = require('./router/reservation');


        //TEST
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const produitRoutes = require("./router/liste-produit");

//Connexion base de donnees
// mongoose.connect('mongodb+srv://boubacarndiaye:boubacar@route-liste-produit.9hnsns9.mongodb.net/?retryWrites=true&w=majority&appName=Route-liste-produit')
const predictRoutes = require('./router/predict');




app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


        //Test
// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation avec Swagger'
    }
  },
  apis: ['./router/*.js'] // Chemin vers vos fichiers de routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Route pour la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    url: 'https://petstore.swagger.io/v2/swagger.json' 
  }
}));




app.use('/api/register', RouteUsers);
app.use('/api/auth', require('./router/auth'));
app.use('/api/admin/', RouteUsers);
app.use('/api/email', emailRoutes); 


app.use("/admin", adminRouteProduit);
app.use("/user", adminRouteProduit);
app.use(localisationRoutes);


// app.use('/api/passwords', userRoutes);
// app.use('/api/reservation', reservationRoutes);
// app.use("/admin", produitRoutes); //test
app.use("/admin", produitRoutes);
// app.use('/api/passwords', userRoutes);
app.use('/api/reservation', reservation);

//forgot password
app.use("/api", forgotPasswordRoutes);

//Reservation table
app.use("/api/reservation-table", reservationRoutes);



// Redirection de la racine vers /api-docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Routes de l'application

const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password',)

  .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
  .catch(err => console.log(err));




module.exports = app;