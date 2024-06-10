const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderscontrollers');

// Route pour passer une commande
router.post('/', ordersController.placeOrder);

module.exports = router;


