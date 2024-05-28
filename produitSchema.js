// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");

// const app = express();
// const PORT = 4000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// const mongoURI =
//   "mongodb+srv://gayefatimabinetou:gRyoV5xgEsPyivTt@cluster0.3loxuhp.mongodb.net/tache21?retryWrites=true&w=majority";

// // Connexion à MongoDB via MongoClient
// const client = new MongoClient(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// client.connect().then(() => {
//   console.log("Connected to MongoDB");

//   // Schéma et modèle Mongoose
//   const productSchema = new mongoose.Schema({
//     title: String,
//     price: String,
//     description: String,
//     id: Number,
//   });

//   const productModel = mongoose.model("Product", productSchema);

//   app.post("/ajout", async (req, res) => {
//     try {
//       const { title, price, description, id } = req.body;
//       const newProduct = new productModel({ title, price, description, id });
//       await newProduct.save();
//       res.status(201).json({ message: "Product ajouté", product: newProduct });
//     } catch (err) {
//       res.status(500).json({ message: "Pas ajouté" });
//     }
//   });


//   // DELETE Products
 
//   // Lancement du serveur
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
// }).catch(err => {
//   console.error("Erreur lors de la connexion à MongoDB :", err);
// });
