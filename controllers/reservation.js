
const Reservation = require('../models/reservation');

// je crée une reservation
exports.createReservation = async (req, res) => {
    const { numberGuest, date, time } = req.body;

    try {
        const newReservation = new Reservation({numberGuest,date,time});
        await newReservation.save();
        return res.status(201).json(newReservation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la création de la réservation' });
    }
};


// je récupére toutes  les réservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        return res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
    }
};

// je récupére les réservations par date
exports.getReservationsDate = async (req, res) => {
    const { date } = req.params;
    try {
        const reservations = await Reservation.find({ date: new Date(date) });
        return res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
    }
};

// je récupére les réservations par heure
exports.getReservationsTime = async (req, res) => {
    const { time} = req.params;
    try {
        const reservations = await Reservation.find({ time:time });
        return res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
    }
};

// je supprime une réservation par son id
exports.deleteReservation = async (req, res) => {
        const reservationId = req.params.id;
        try {
            const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
    
            if (!deletedReservation) {
                return res.status(404).json({ message: 'Réservation non trouvée' });
            }
    
            return res.status(200).json({ message: 'Réservation supprimée avec succès' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erreur lors de la suppression de la réservation' });
        }
    };

    // j'ai modifié la date
exports.patchDateReservation = async (req, res) => {
        const {numberGuest,oldDate,newDate} = req.body;
        try {
            const patchReservation = await Reservation.findOneAndUpdate(
                {numberGuest,date:oldDate},
                {date:newDate},
                {new:true}
            );
    
            if (!patchReservation) {
                return res.status(404).json({ message: 'Réservation non trouvée' });
            }
    
            return res.status(200).json({ message: 'Réservation modifié avec succès'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erreur lors de la modification de la réservation'});
        }
    };


    exports.patchTimeReservation = async (req, res) => {
        const {numberGuest,oldTime,newTime} = req.body;
        try {
            const patchReservation = await Reservation.findOneAndUpdate(
                {numberGuest,time:oldTime},
                {time:newTime},
                {new:true}
            );
    
            if (!patchReservation) {
                return res.status(404).json({ message: 'Réservation non trouvée' });
            }
    
            return res.status(200).json({ message: 'Réservation modifié avec succès'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erreur lors de la modification de la réservation'});
        }
    };





