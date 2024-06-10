const Send= require ('../models/email');
const nodemailer = require('nodemailer');

 exports.sendEmail = (req,res) =>{
    const send = new Send(req.body);
    send()
    .then(() => {
      res.status(200).json({ message: 'Email envoyer avecsuccess' });
    })
        .catch((err) => {
       console.error(err.message);
      res.status(500).json({ message: 'Email error' });
        })
 }

