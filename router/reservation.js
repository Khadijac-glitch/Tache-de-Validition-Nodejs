const express = require('express');
const reservationController = require('../controllers/reservation');

const router = express.Router();

router.post('/', reservationController.createReservation);
router.get('/getallreservation', reservationController.getAllReservations);

module.exports = router;
