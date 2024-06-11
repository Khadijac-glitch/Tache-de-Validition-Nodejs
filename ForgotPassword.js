const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const forgotPasswordRoutes = require('./router/forgotpassword');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://madjiguened835:Hr0NWZprD4lcz1BH@get-password.sot5wfh.mongodb.net/?retryWrites=true&w=majority&appName=get-password', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connexion réussie'))
  .catch(err => console.error('Echec de la connexion', err));

app.use('/api', forgotPasswordRoutes);

app.listen(3030, () => {
  console.log("Server is running on port :3030");
});
