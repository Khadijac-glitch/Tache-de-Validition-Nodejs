

const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  invites: Number,
  date: String,
  hour: String,
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: String,
  roomId: String,
  tableId: Number,
  specialRequests: String,
});

module.exports = mongoose.model('ReservationTable', reservationSchema);


