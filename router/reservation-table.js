const express = require('express');
const reservationController = require('../controllers/reservation-table');

const router = express.Router();
 
router.post('/', reservationController.createReservation);
router.delete('/:tableId', reservationController.deleteReservation);
router.get('/reserved-tables', reservationController.getReservedTables);

module.exports = router;

