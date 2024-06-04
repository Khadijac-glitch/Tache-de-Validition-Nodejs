const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');


router.post('/reservations', reservationController.createReservation);
router.get('/reservations', reservationController.getAllReservations);
router.get('/reservations/date/:date', reservationController.getReservationsDate);
router.get('/reservations/time/:time', reservationController.getReservationsTime);
router.delete('/reservations/:id', reservationController.deleteReservation);
router.patch('/reservations/change-date', reservationController.patchDateReservation);
router.patch('/reservations/change-time', reservationController.patchTimeReservation);


 

module.exports = router;
