const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./router/orderRoutes');
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0',{
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.use('/api', orderRoutes);
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });

  
  // User, Dish, Order Models: Ces modèles définissent la structure des utilisateurs, des plats et des commandes dans la base de données.
  // Route POST /orders: Crée une nouvelle commande, calcule le prix total incluant les frais de livraison si applicable, et enregistre la commande dans la base de données.
  // Route GET /orders/
  // : Récupère les détails d'une commande spécifique en utilisant son identifiant.
  // Route PUT /orders/
  // : Met à jour les informations d'une commande existante.
  // Route DELETE /orders/
  // : Supprime une commande existante de la base de données.