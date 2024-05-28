const express = require('express');
const GetPassword  = express();
const bodyParser = require('body-parser');
const RoutePassword = require('./router/password');
const mongoose = require('mongoose');
const crypto = require('crypto');

 function generatePassword() {
      const charset ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?"
      let length = 16;
      let password = '';
      const charsetLength = charset.length;
    
      for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charsetLength);
        password += charset[randomIndex];
      }
    
      return password;
    }
    

mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password ')

.then(() => {
    console.log('connexion success!')
})
.catch((error) => {
    console.log(error);
});


GetPassword.get('/api/passwords/', (req, res) => {
      const length = parseInt(req.query.length) || 16;
      const newPassword = generatePassword(length);
      res.send(`Votre nouveau mot de passe est : ${newPassword}`);
    });

GetPassword.patch('/api/passwords/', (req, res) => {
        const length = parseInt(req.query.length) || 16;
        const newPassword = generatePassword(length);
        res.send(`Votre  mot de passe a été modifié: ${newPassword}`);
      });
  

GetPassword.use(bodyParser.json())
GetPassword.use('/api/passwords/', RoutePassword);



module.exports = GetPassword;




