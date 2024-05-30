const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const GetPassword = express();
const mongoose = require('mongoose');
const RouteUsers = require('./router/register');
const RouterUser = require("./router/user");

const router = express.Router()
const ProdCtrl = require('./controllers/register');
const ProdCtrl1 = require("./controllers/connexion"); //mooo


// Middleware
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});




GetPassword.use((req, res, next) => {
    console.log( req.body);
    next();
});




//Mada db
mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password', {
})
.then(() => {
    console.log('Connexion réussie!');
})
.catch((error) => {
    console.error('Erreur de connexion à MongoDB:', error);
});



// Khadijaa db
mongoose.connect('mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',)
.then(() => {
    console.log('connexion success !')
})
.catch((error) => {
    console.log('Erreur de connexion');
});



//Sadiaa db
mongoose.connect("mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0",{})
  .then(() => {
    console.log("connexion success !");
  })
  .catch((error) => {
    console.log("Erreur de connexion");
  });








                //Router/Register.js

// Importer les routes
const userRoutes = require('./router/password');
// const ProdCtrl = require('../controllers/register');
// const ProdCtrl = require('./router/register');



// User CRUD
// router.post('/register', ProdCtrl.createUser);
router.get('/:get-user', ProdCtrl.getOneUser);
router.patch('/patch-user/:id', ProdCtrl.patchUser);
router.delete('/delete-user/:id', ProdCtrl.deleteUser);

// Admin CRUD
router.post('/:admin-register', ProdCtrl.createAdminUser);
router.patch('/patch-admin/:id', ProdCtrl.patchAdmin);
router.delete('/delete-admin/:id', ProdCtrl.deleteAdmin);
// const productRoutes = require('./routes/products');

////////////////////////////////////////////////////////
// User CRUD
router.post('/:register', ProdCtrl1.createUser);
router.get('/:user', ProdCtrl1.getOneUser);
router.patch('/:id', ProdCtrl1.patchUser);
router.delete('/:id', ProdCtrl1.deleteUser);
// Admin CRUD
router.post('/:register', ProdCtrl1.createAdminUser);
router.patch('/:id', ProdCtrl1.patchAdmin);
router.delete('/:id', ProdCtrl1.deleteAdmin);
////////////////////////////////////////////////////////





// Utiliser les routes
app.use('/passwords', userRoutes);
app.use('/users/', RouteUsers);
app.use('/admin/', RouteUsers);
app.use("/api/users/", RouterUser); //moooooooooooooooooo


// app.use('/products', productRoutes);






// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;

//mooooooo