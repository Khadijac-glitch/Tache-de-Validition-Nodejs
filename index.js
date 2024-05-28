require('dotenv').config();
const {connectDb} = require('./services/mongoose')
const Produit = require('./models/product')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000


connectDb().catch(err => console.log(err))

app.listen(port, () => {
    console.log('Le serveur est lancé');
})


app.get('/liste-produits', async (req, res, next) => {
    try {
        const produits = await Produit.find({})
        res.send(produits)
    } catch (e) {
        res.status(500).send(e)
    }
})

