require('dotenv').config();
const {connectDb} = require('./services/mongoose')
const Produit = require('./models/product')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000


connectDb().catch(err => console.log(err))

app.use(express.json())

app.listen(port, () => {
    console.log('Le serveur est lancé');
})



//Ajouter un produit  ===> admin
app.post(`/admin/liste-produits`, async (req, res, next) => {
    try {
        const produit = new Produit(req.body)
        const saveProduit = await produit.save()
        res.status(201).send(saveProduit)
    } catch (e) {
        res.status(500).send(e)
    }
})


// Voir la liste de tous les produits  ===> admin
app.get('/admin/liste-produits', async (req, res, next) => {
    try {
        const produits = await Produit.find({})
        res.send(produits)
    } catch (e) {
        res.status(500).send(e)
    }
})



// // Voir les details d'un produit ===> admin
app.get('/admin/liste-produits/:id', async (req, res, next) => {
    const produitId = req.params.id
    try {
        const produits = await Produit.findById(produitId)
        if (!produits) {return res.status(404).send('Produit non trouvé')}
        res.send(produits)
    } catch (e) {
        res.status(500).send(e)
    }
})


// // Modifier un produit  ===> admin
app.patch(`/admin/liste-produits/:id`, async (req, res, next) => {
    const produitId = req.params.id

    try {
        const produits = await Produit.findByIdAndUpdate(produitId, req.body)
        if (!produits) return res.status(404).send('Produit non trouvé')
        res.send(produits)
    } catch (e) {
        res.status(500).send(e)
    }
})


// //Supprimer un produit ===> admin
app.delete(`/admin/liste-produits/:id`, async (req, res, next) => {
    const produitId = req.params.id

    try {
        const produits = await Produit.findByIdAndDelete(produitId)
        if (!produits) return res.status(404).send('Produit non trouvé')
        res.send(produits)
    } catch (e) {
        res.status(500).send(e)
    }
})



                            // Pour les users

// Voir la liste de tous les produits  ===> admin
app.get('/user/liste-produits', async (req, res, next) => {
    try {
        const produits = await Produit.find({})
        res.send(produits)
    } catch (e) {
        res.status(500).send(e)
    }
})



// // Voir les details d'un produit ===> admin
app.get('/user/liste-produits/:id', async (req, res, next) => {
    const produitId = req.params.id
    try {
        const produits = await Produit.findById(produitId)
        if (!produits) {return res.status(404).send('Produit non trouvé')}
        res.send(produits)
    } catch (e) {
        res.status(500).send(e)
    }
})





// Creer une route pour afficher une localisation
app.get('/location', (req, res) => {
    const location = {
        latitude: 14.7437625,   
        longitude: -17.4557196   
    };

    res.json(location);
});

