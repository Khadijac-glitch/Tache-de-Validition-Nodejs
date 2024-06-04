const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const productSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  id: Number,
});

const productModel = mongoose.model("Product", productSchema);

const mongoURI =
  "mongodb+srv://gayefatimabinetou:gRyoV5xgEsPyivTt@cluster0.3loxuhp.mongodb.net/tache21?retryWrites=true&w=majority";
mongoose.connect(mongoURI).then(() => {
  console.log("Connected to MongoDB");

  // Post Products
  app.post("/ajout", async (req, res) => {
    try {
      const { title, price, description, id } = req.body;
      const newProduct = new productModel({ title, price, description, id });
      await newProduct.save();
      res.status(201).json({ message: "Product ajouté", product: newProduct });
    } catch (err) {
      res.status(500).json({ message: "Pas ajouté" });
    }
  });

  //    GET Products
  app.get("/recup", async (req, res) => {
    try {
      const products = await productModel.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: "err" });
    }
  });
  // Get By Id
  // app.get("/recup/:id", async (req, res) => {
  //   const { id } = req.params;
  //   const test = await productModel.findById(id);
  //   res.status(200).json({ message: "recupéré avec succés", test: test });
  // });
  // Modify Products
  app.patch("/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, price, description } = req.body;
      const updatedProduct = await productModel.findByIdAndUpdate(
        id,
        { $set: { title, price, description } },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: "An error occurred: " + err.message });
    }
  });
  // DELETE Product by ID
  app.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const deletedProduct = await productModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted", deletedProduct });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({
        message: "An error occurred while deleting the product.",
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
