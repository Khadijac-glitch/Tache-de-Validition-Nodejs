const express = require('express');
const GetPassword  = express();
const bodyParser = require('body-parser');
const RoutePassword = require('./router/password');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password ')

.then(() => {
    console.log('connexion success!')
})
.catch((error) => {
    console.log(error);
});

GetPassword.get('/api/passwords/',(req,res) =>{
    res.send();

})

GetPassword.use(bodyParser.json())
GetPassword.use('/api/passwords/', RoutePassword);





module.exports = GetPassword;








