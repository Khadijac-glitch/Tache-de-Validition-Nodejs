const mongoose = require('mongoose');
const mypassword = mongoose.Schema({ 
    username:{
            type:String,
            required:true,
            
    },
    password: {
        type:String,
        required:true,
        
    },
  
});
module.exports = mongoose.model('Password', mypassword);

