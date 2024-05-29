const express = require('express');
const router = express.Router();
const sendEmail = require('../models/email');

// Route pour envoyer des e-mails
router.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await sendEmail(to, subject, text);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

module.exports = router;
