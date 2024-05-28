const { urlencoded } = require("body-parser");
const express = require("express");
const app = express();
// const product = require("./produitSchema");
const { MongoClient } = require("mongodb");
const PORT = 4000;
const client = new MongoClient(
  "mongodb+srv://gayefatimabinetou:gRyoV5xgEsPyivTt@cluster0.3loxuhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
app.use(urlencoded());
const mongoose = require("mongoose");
const Schema = require("mongoose");
const schemas = mongoose.Schema({
  title: String,
  price: String,
  description: String,
  id: Number,
});
const productModel = mongoose.model("product", schemas);

async function connect() {
  try {
    await client.connect();
    console.log("connecté");
  } catch (e) {
    console.log(e);
  }
}
connect();
app.post("/ajout", async (req, res) => {
  console.log(req.body);
  const db = client.db("tache21");
  const collection = db.collection("product");
  const data = new productModel({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    id: req.body.id,
  });
  await collection.insertMany([data]);
  res.status(201).json({
    message: "Tâche ajoutée avec succès",
  });

  //   const { title, price, description } = req.body;
  //   const db = client.db("tache21");
  //   const collection = db.collection("product");
  //   const insert = new product({
  //     title: title,
  //     price: price,
  //     description: description,
  //   });
  //   await collection.insertMany([insert]);
  //   res.status(201).json({
  //     message: "Tâche ajoutée avec succès",
  //     title: title,
  //     price: price,
  //     description: description,
  //   });
});
app.get("/recup", async (req, res) => {
  try {
    const db = client.db("tache21");
    const collection = db.collection("product");
    const tasks = await collection.find().toArray();
    res.json(tasks);
  } catch {
    console.log("error");
  }
});
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { title, price, description } = req.body;
    const updatedProduct = await productModel.findOneAndUpdate(
      { id: Number(id) },
      { title, price, description },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
});

// Démarrage du savoir
app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
