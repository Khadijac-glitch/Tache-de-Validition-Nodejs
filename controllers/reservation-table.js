const ReservationTable = require('../models/reservation-table');

exports.createReservation = async (req, res) => {
    try {
        const { tableId } = req.body;
        
        const existingReservation = await ReservationTable.findOne({ tableId });
        if (existingReservation) {
<<<<<<< HEAD
            return res.status(203).json({ message: 'Cette table est déjà réservée.' });
=======
            return res.status(301).json({ message: 'Cette table est déjà réservée.' });
>>>>>>> a43e48a4ae66f6f31c92c07a99a1562cfde9a2ed
        }

        const newReservation = new ReservationTable({ tableId });
        const savedReservation = await newReservation.save();

        res.status(201).json(savedReservation);
    } catch (error) {
        console.error(error);
<<<<<<< HEAD
        res.status(406).json({ message: 'Une erreur est survenue lors de la réservation de la table.' });
=======
        res.status(403).json({ message: 'Une erreur est survenue lors de la réservation de la table.' });
>>>>>>> a43e48a4ae66f6f31c92c07a99a1562cfde9a2ed
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const { tableId } = req.params;
        
        const existingReservation = await ReservationTable.findOne({ tableId });
        if (!existingReservation) {
            return res.status(301).json({ message: 'Cette table n\'a pas été réservée.' });
        }
    
        await ReservationTable.deleteOne({ tableId });
        res.status(201).json({ message: `La réservation de la table ${tableId} a été annulée.` });
    } catch (error) {
        console.error(error);
<<<<<<< HEAD
        res.status(406).json({ message: 'Une erreur est survenue lors de l\'annulation de la réservation.' });
=======
        res.status(403).json({ message: 'Une erreur est survenue lors de l\'annulation de la réservation.' });
>>>>>>> a43e48a4ae66f6f31c92c07a99a1562cfde9a2ed
    }
};

exports.getReservedTables = async (req, res) => {
    try {
        const reservations = await ReservationTable.find();
        const reservedTables = reservations.map(reservation => reservation.tableId);
        res.status(201).json(reservedTables);
    } catch (error) {
        console.error(error);
<<<<<<< HEAD
        res.status(408).json({ message: 'Une erreur est survenue lors de la récupération des tables réservées.' });
=======
        res.status(403).json({ message: 'Une erreur est survenue lors de la récupération des tables réservées.' });
>>>>>>> a43e48a4ae66f6f31c92c07a99a1562cfde9a2ed
    }
};
