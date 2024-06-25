const express = require('express');
const reservationController = require('../controllers/reservation-table');

const router = express.Router();

// /api/reservation-table

/**
 * @swagger
 * /api/reservation-table:
 *   post:
 *     summary: Créer une réservation
 *     description: Endpoint pour créer une nouvelle réservation de table
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: reservation
 *         description: Informations de la réservation de table à créer
 *         schema:
 *           type: object
 *           properties:
 *             tableId:
 *               type: string
 *               example: "table123"
 *     responses:
 *       201:
 *         description: Réservation de table créée avec succès
 *       203:
 *         description: Cette table est déjà réservée
 *       406:
 *         description: Une erreur est survenue lors de la réservation de la table
 */
router.post('/', reservationController.createReservation);

/**
 * @swagger
 * /api/reservation-table/{tableId}:
 *   delete:
 *     summary: Supprimer une réservation de table
 *     description: Endpoint pour supprimer une réservation de table existante
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         type: string
 *         description: ID de la table réservée
 *     responses:
 *       201:
 *         description: Réservation de table supprimée avec succès
 *       404:
 *         description: Cette table n'a pas été réservée
 *       406:
 *         description: Une erreur est survenue lors de l'annulation de la réservation
 */
router.delete('/:tableId', reservationController.deleteReservation);

/**
 * @swagger
 * /api/reservation-table/reserved-tables:
 *   get:
 *     summary: Obtenir les tables réservées
 *     description: Endpoint pour obtenir la liste des tables actuellement réservées
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Liste des tables réservées
 *       408:
 *         description: Une erreur est survenue lors de la récupération des tables réservées
 */
router.get('/reserved-tables', reservationController.getReservedTables);

module.exports = router;
