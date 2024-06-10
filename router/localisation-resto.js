const express = require("express");
const router = express.Router();

// Créer une route pour afficher la localisation du restaurant
router.get("/localisation", (req, res) => {
  const location = {
    latitude: 14.7437625,
    longitude: -17.4557196,
  };
  res.json(location);
});

module.exports = router;
