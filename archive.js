const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
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

  // Route pour archiver un produit
app.put('/api/products/:id/archive', (req, res) => {
    const productId = req.params.id;
    // Logique pour archiver le produit, par exemple en mettant à jour un champ `archived` dans la base de données
    Product.findByIdAndUpdate(productId, { archived: true }, { new: true })
        .then(product => res.json(product))
        .catch(err => res.status(500).json({ error: 'Erreur lors de l\'archivage du produit' }));
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });