const express  = require('express')
const router = express.Router()
const ProdCtrl = require('../controllers/predict');

// User CRUD
router.post('/predict', ProdCtrl.createPredict);

module.exports = router;