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
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
let heuresPrises = ['9:00', '10:00'];
let heuresDisponibles = ['8:00', '9:00', '10:00', '11:00'];

  exports.ReservedHours = async (req, res) => {
    let disponibles = heuresDisponibles.filter(heure => !heuresPrises.includes(heure));
    let indisponibles = heuresPrises.filter(heure => heuresDisponibles.includes(heure));

    res.json({
        heures_disponibles: disponibles,
        heures_indisponibles: indisponibles
    })}