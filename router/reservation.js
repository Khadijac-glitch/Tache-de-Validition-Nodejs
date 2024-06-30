const express = require("express");
const reservationController = require("../controllers/reservation");

const router = express.Router();

/**
 * @swagger
 * /api/reservation:
 *   post:
 *     summary: Créer une réservation
 *     description: Endpoint pour créer une nouvelle réservation
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: reservation
 *         description: Informations de la réservation à créer
 *         schema:
 *           type: object
 *           properties:
 *             exampleProperty:
 *               type: string
 *               example: Example Value
 *     responses:
 *       200:
 *         description: Réservation créée avec succès
 */
router.post("/", reservationController.createReservation);

/**
 * @swagger
 * /api/reservation/getallreservation:
 *   get:
 *     summary: Obtenir toutes les réservations
 *     description: Endpoint pour obtenir toutes les réservations existantes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Liste de toutes les réservations
 */
router.get("/getallreservation", reservationController.getAllReservations);
router.get('/hours', reservationController.ReservedHours);
router.post('/cancelReservation', reservationController.cancelReservation);

module.exports = router;