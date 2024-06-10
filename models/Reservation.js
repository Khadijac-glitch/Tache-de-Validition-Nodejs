// models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  reservationDetails: { type: String, required: true },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
