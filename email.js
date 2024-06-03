const express = require('express');
const mongoose = require('mongoose');
const app = express();
const emailRoutes = require('./router/email');
mongoose.connect('mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',

)

.then(() => {
    console.log('connexion success !')
})
.catch((error) => {
    console.log('Erreur de connexion',error);
});
app.use(express.json());

app.use('/email', emailRoutes); 

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server connecté au port ${PORT}`));
