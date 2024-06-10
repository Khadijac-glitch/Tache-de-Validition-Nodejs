const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const RouteUsers = require('./router/register');
const userRoutes = require('./router/password');
const RouterUser = require("./router/user")
const emailRoutes = require('./router/email');
const reservationRoutes = require('./router/reservation');
const adminRouteProduit = require("./router/liste-produit");
const localisationRoutes = require("./router/localisation-resto");

const orderRoutes = require('./router/index-reserve')




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


// Connexion à MongoDB
mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
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




app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

app.use('/api/users/', RouteUsers);
app.use('/api/users/', predictRoutes);
app.use('/api/admin/', RouteUsers);
app.use('/api/email', emailRoutes); 


app.use("/admin", adminRouteProduit);
app.use("/user", adminRouteProduit);
app.use(localisationRoutes);


app.use('/api/passwords', userRoutes);
app.use('/api/login/', RouterUser);
app.use('/api/reservation', reservationRoutes);


app.use('/reservation', orderRoutes); //test





app.listen(8080, () => {
    console.log(`Serveur en cours d'exécution sur le port 8080`);
  });



module.exports = app;