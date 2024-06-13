const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');

// Route pour la confirmation de réservation
router.post('/confirm-reservation', reservationController.createReservation);

module.exports = router;
