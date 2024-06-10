<<<<<<< HEAD
const mongoose = require("mongoose");
// const validator = require("validator");
=======
const mongoose = require('mongoose');
const validator = require('validator');
const userRegister = mongoose.Schema({
    firstName:{
    type:String,
    required:true,
    },
    lastName:{
        type:String,
        required:true,
        },
    email: {
        type:String,
        required:true,
        validate(v) {
        if(!validator.isEmail(v)) throw new Error('Email non valide!');   
    }
    },
    number:{
        type:Number,
        required:true,
        },
    password: {
        type:String,
        required:true,
        validate(v) {
        if(!validator.isLength(v,{ min:4,max:20 })) throw new Error('Le mot de passe doit etre entre 4 et 20 caractères!');
        }
    },
    confirmPassword: {
        type:String,
        required:true,
        validate(v) {
        if(!validator.isLength(v,{ min:4,max:20 })) throw new Error('Le mot de passe doit etre entre 4 et 20 caractères!');
        }
    }
>>>>>>> 5d8c406dcf031b7e6bce2ef0694a844234b9045c

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
module.exports = mongoose.model('Register', userRegister);
>>>>>>> 5d8c406dcf031b7e6bce2ef0694a844234b9045c
