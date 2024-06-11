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
const adminRouteProduit = require("./router/liste-produit");
const localisationRoutes = require("./router/localisation-resto");

//Swagger
const { swaggerUi, swaggerSpec} = require('./swagger')


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route pour avoir la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




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


// // Fonction pour vérifier les informations d'identification
// function checkAuth(username, password) {
//     return username === 'admin' && password === 'secret';
// }

// Middleware pour demander l'authentification
// function authenticate(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         res.setHeader('WWW-Authenticate', 'Basic realm="Login Required"');
//         return res.status(401).send('Accès restreint. Veuillez fournir vos informations d\'identification.');
//     }

//     const base64Credentials = authHeader.split(' ')[1];
//     const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
//     const [username, password] = credentials.split(':');

//     if (checkAuth(username, password)) {
//         next();
//     } else {
//         res.setHeader('WWW-Authenticate', 'Basic realm="Login Required"');
//         return res.status(401).send('Informations d\'identification invalides.');
//     }
// }


// Route protégée par authentification
// app.get('/', authenticate, (req, res) => {
//     res.send('Vous êtes authentifié avec succès !');
// });



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


// Redirection de la racine vers /api-docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});



app.listen(8080, () => {
    console.log(`Serveur en cours d'exécution sur le port 8080`);
  });



module.exports = app;