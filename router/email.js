const express = require('express');
const router = express.Router();
const sendEmail = require('../models/email'); 

router.post('/send', (req, res) => {
  const { to, subject, text } = req.body;

  sendEmail(to, subject, text)
    .then(() => {
      res.status(200).json({ message: 'Email envoyer avec success' });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ message: ' Error email' });
    });
});

module.exports = router;


// const express  = require('express')
// const router = express.Router()
// const ProdCtrl = require('../controllers/email');

// // User CRUD
// router.post('/send-email', ProdCtrl.sendEmail);


 
