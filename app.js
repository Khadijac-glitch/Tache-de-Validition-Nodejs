const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Importer les routes des commandes
const ordersRouter = require('./router/orderRoutes');
app.use('/orders', ordersRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});




