const mongoose = require('mongoose');

const Produit = mongoose.model('Produit', {
        name: String,
        description: String,
        price: Number
    })


module.exports = Produit;