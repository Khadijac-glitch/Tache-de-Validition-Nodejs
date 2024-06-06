const express = require("express");
const Produit = require("../models/product");
const router = express.Router();

// Ajouter un produit  ===> admin
router.post("/liste-produits", async (req, res, next) => {
  try {
    const produit = new Produit(req.body);
    const saveProduit = await produit.save();
    res.status(201).send(saveProduit);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Voir la liste de tous les produits  ===> admin
router.get("/liste-produits", async (req, res, next) => {
  try {
    const produits = await Produit.find({});
    res.send(produits);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Voir les détails d'un produit ===> admin
router.get("/liste-produits/:id", async (req, res, next) => {
  const produitId = req.params.id;
  try {
    const produits = await Produit.findById(produitId);
    if (!produits) return res.status(404).send("Produit non trouvé");
    res.send(produits);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Modifier un produit  ===> admin
router.patch("/liste-produits/:id", async (req, res, next) => {
  const produitId = req.params.id;
  try {
    const produits = await Produit.findByIdAndUpdate(produitId, req.body);
    if (!produits) return res.status(404).send("Produit non trouvé");
    res.send(produits);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Supprimer un produit ===> admin
router.delete("/liste-produits/:id", async (req, res, next) => {
  const produitId = req.params.id;
  try {
    const produits = await Produit.findByIdAndDelete(produitId);
    if (!produits) return res.status(404).send("Produit non trouvé");
    res.send(produits);
  } catch (e) {
    res.status(500).send(e);
  }
});




// Voir la liste de tous les produits  ===> user
router.get("/liste-produits", async (req, res, next) => {
  try {
    const produits = await Produit.find({});
    res.send(produits);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Voir les détails d'un produit ===> user
router.get("/liste-produits/:id", async (req, res, next) => {
  const produitId = req.params.id;
  try {
    const produits = await Produit.findById(produitId);
    if (!produits) return res.status(404).send("Produit non trouvé");
    res.send(produits);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
