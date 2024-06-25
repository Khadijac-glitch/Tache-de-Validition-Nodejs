// routes/newsletters.js
const express = require('express');
const newsletterController = require('../controllers/newsletters');

const router = express.Router();

router.post('/', newsletterController.subscribe);

module.exports = router;
