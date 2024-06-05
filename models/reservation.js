const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    numberGuest: 
           { 
            type: Number, 
            required: true 
        },
    date:
     {
         type: Date,
          required: true 
        },
    time:{ 
        type: String, 
        required: true
     }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;







