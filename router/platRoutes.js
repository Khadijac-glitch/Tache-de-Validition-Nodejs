const express = require('express');
const Plat = require('../models/Plats');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const plats = await Plat.find();
        res.json(plats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch plats' });
    }
});

module.exports = router;

// pour Obtenir les plats disponibles (GET /api/plats)
