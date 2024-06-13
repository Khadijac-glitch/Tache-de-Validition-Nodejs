// routes/newsletters.js
const express = require('express');
const newsletterController = require('../controllers/newsletter');

const router = express.Router();

router.post('/', newsletterController.subscribe);

module.exports = router;