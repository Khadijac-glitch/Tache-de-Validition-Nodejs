const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
    try {
        const { invites, date, hour } = req.body;
        const newReservation = new Reservation({ invites, date: new Date(date), hour });
        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};
// const reservations = [
//     { date: '2024-06-26', time: '14:00:00' },
//     { date: '2024-06-26', time: '15:30:00' },
//   ];
  
//   const getCurrentTime = () => {
//     const now = new Date();
//     return now.toTimeString().split(' ')[0];
//   };
  
//   exports.ReservedHours = async (req, res) => {
//     const { date } = req.params;
//     const currentTime = getCurrentTime();
  
//     const heures_indisponibles = reservations
//       .filter(reservation => reservation.date === date)
//       .map(reservation => reservation.time);
  
//     const heures_disponibles = Array.from({ length: 24 * 2 }, (_, i) => {
//       const hour = Math.floor(i / 2);
//       const minute = i % 2 === 0 ? '00' : '30';
//       return `${hour < 10 ? '0' : ''}${hour}:${minute}:00`;
//     }).filter(time => time > currentTime);
  
//     res.json({ heures_disponibles, heures_indisponibles });
//   };
  

const reservations = [
  { date: '2024-06-26', time: '14:00:00' },
  { date: '2024-06-26', time: '15:30:00' },
];

const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
};

const generateTimes = () => {
  return Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour < 10 ? '0' : ''}${hour}:${minute}:00`;
  });
};

const getAvailableAndReservedHours = (requestedDate, currentTime) => {
  const allTimes = generateTimes();

  const heures_indisponibles = reservations
    .filter(reservation => reservation.date === requestedDate)
    .map(reservation => reservation.time);

  const heures_disponibles = allTimes.filter(time => {
    if (requestedDate === new Date().toISOString().split('T')[0]) {
      return time > currentTime && !heures_indisponibles.includes(time);
    }
    return !heures_indisponibles.includes(time);
  });

  return { heures_disponibles, heures_indisponibles };
};

  exports.ReservedHours = async (req, res) => {

  const { date } = req.params;
  const currentTime = getCurrentTime();

  const requestedDate = new Date(date);
  const today = new Date();

  if (requestedDate > today) {
    return res.json({ heures_disponibles: generateTimes(), heures_indisponibles: [] });
  }

  const { heures_disponibles, heures_indisponibles } = getAvailableAndReservedHours(date, currentTime);
  res.json({ heures_disponibles, heures_indisponibles });
}


exports.cancelReservation = async (req, res) => {
  try {
    const { invites, date, hour } = req.body;
    const reservationDate = new Date(date);

    const deletedReservation = await Reservation.findOneAndDelete({ invites, date: reservationDate, hour });

    if (!deletedReservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.status(200).json({ message: 'Réservation annulée avec succès' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
