const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Assurez-vous de créer un modèle User avec Mongoose

// Route d'inscription
router.post('/register', async (req, res) => {
    // Logique d'inscription ici
});

// Route de connexion
router.post('/login', async (req, res) => {
    // Logique de connexion ici
});

module.exports = router;
