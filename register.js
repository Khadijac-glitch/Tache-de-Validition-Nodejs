const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const RouteUsers = require('./router/register');
mongoose.connect('mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
 
)

.then(() => {
    console.log('connexion success !')
})
.catch((error) => {
    console.log('Erreur de connexion');
});

app.use(bodyParser.json())
app.use('/users/', RouteUsers);
app.use('/admin/', RouteUsers);

app.listen(8000, () => {
    console.log(`Serveur en cours d'exécution sur le port 8000`);
  });
module.exports = app;