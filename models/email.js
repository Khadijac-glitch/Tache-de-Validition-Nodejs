const nodemailer = require('nodemailer');
require('dotenv').config();

// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "passpartoutsn@gmail.com",
//     pass: "afaq ywrb asby baky",
//   },
// });

// Configuration du transporteur d'e-mails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
        user: 'passpartoutsn@gmail.com',
        pass: 'afaq ywrb asby baky',
      }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

