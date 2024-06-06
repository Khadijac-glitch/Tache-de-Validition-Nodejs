const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: String,
    // autres champs
});
module.exports = mongoose.model('Reservation', userSchema);