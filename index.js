const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./router/orderRoutes');
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://elzofils:sadia2020@cluster0.m6lkoeh.mongodb.net/nodeapis?retryWrites=true&w=majority&appName=Cluster0',)
.then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.use('/api', orderRoutes);
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });

