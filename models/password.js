const mongoose = require('mongoose');
const prod = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    
    password: {
        type:String,
        required:true,
    },
  
});
module.exports = mongoose.model('Password', prod);


