<<<<<<< HEAD
const mongoose = require("mongoose");
// const validator = require("validator");
=======
const mongoose = require('mongoose');
>>>>>>> 04626f718f56496c80ccdbc9a894c1c4607fc034

const user = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  
  email: {
      type: String,
      required: true,
      unique: true
    },

  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
   
  },
  confirmPassword: {
    type: String,
    required: true,
   
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
},
});
<<<<<<< HEAD
 



module.exports = mongoose.model("Register", user);
=======
module.exports = mongoose.model('Register', user);
>>>>>>> 04626f718f56496c80ccdbc9a894c1c4607fc034
