const express = require("express");
const Produit = require("../models/product");
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://tache-21-a450a.appspot.com/images", // Remplacez par l'URL de votre bucket Firebase Storage
});

const storage = admin.storage();

/**
 * @swagger
 * /admin/liste-produits:
 *   post:
 *     summary: Ajouter un produit
 *     description: Ajouter un nouveau produit avec une image vers Firebase Storage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       500:
 *         description: Erreur du serveur
 */
router.post("/liste-produits", async (req, res) => {
  try {
    const produit = new Produit({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category, // Ajoutez cette ligne
    });
    const saveProduit = await produit.save();
    res.status(201).send(saveProduit);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * @swagger
 * /admin/liste-produits:
 *   get:
 *     summary: Obtenir tous les produits
 *     description: Récupérer tous les produits de la base de données
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur du serveur
 */
router.get("/liste-produits", async (req, res, next) => {
  try {
    const produits = await Produit.find({});
    res.send(produits);
  } catch (e) {
    res.status(500).send(e);
  }
});




/**
 * @swagger
 * /admin/liste-produits/{id}:
 *   get:
 *     summary: Obtenir les détails d'un produit par ID
 *     description: Endpoint pour obtenir les détails d'un produit spécifique en utilisant son ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Détails du produit
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "60c72b2f9b1d4e3a3c123456"
 *             name:
 *               type: string
 *               example: "Produit Example"
 *             price:
 *               type: number
 *               example: 19.99
 *             description:
 *               type: string
 *               example: "Description du produit example"
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.get("/liste-produits/:id", async (req, res) => {
  const produitId = req.params.id;
  try {
    const produit = await Produit.findById(produitId);
    if (!produit) return res.status(404).send("Produit non trouvé");
    res.send(produit);
  } catch (e) {
    res.status(500).send(e);
  }
});


/**
 * @swagger
 * /admin/liste-produits/{id}:
 *   patch:
 *     summary: Mettre à jour un produit
 *     description: Mettre à jour les détails d'un produit par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.patch("/liste-produits/:id", async (req, res) => {
  const produitId = req.params.id;
  const updates = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category, // Ajoutez cette ligne
  };
  try {
    const produit = await Produit.findByIdAndUpdate(produitId, updates, {
      new: true,
    });
    if (!produit) return res.status(404).send("Produit non trouvé");
    res.send(produit);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * @swagger
 * /admin/liste-produits/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     description: Supprimer un produit par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur du serveur
 */
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

module.exports = router;
