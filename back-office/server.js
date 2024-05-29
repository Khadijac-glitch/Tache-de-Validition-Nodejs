const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); //permet de surmonter cette restriction, autorisant ainsi les requêtes provenant de domaines externes, ce qui est particulièrement utile dans les architectures front-end/back-end séparées

// Connexion à la base de données
mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0',{

})
.then(() => {
    console.log('connexion success !')
})
.catch((error) => {
    console.log('Erreur de connexion');
    process.exit(1); // Terminer le processus si la connexion échoue
});


// Route par défaut
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js Back Office');
});

// Inclure les routes
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const reportRoutes = require('./routes/reports');

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/reports', reportRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
