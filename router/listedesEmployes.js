const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/listedesEmployes');

// Routes pour les employés
router.get('/getting', employeeController.getAllEmployees);
router.post('/', employeeController.createEmployee);
router.delete('/delete/:id', employeeController.deleteEmployee);

module.exports = router;
