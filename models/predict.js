const mongoose = require('mongoose');
const user = mongoose.Schema({
    comment:{
    type:String,
    required:true,
    }
   
    })

    module.exports = mongoose.model('Predict', user);