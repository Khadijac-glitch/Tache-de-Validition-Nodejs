const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
    try {
        const { invites, date, hour } = req.body;
        const newReservation = new Reservation({ invites, date: new Date(date), hour });
        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(201).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
