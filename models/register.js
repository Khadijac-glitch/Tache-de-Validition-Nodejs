const mongoose = require('mongoose');
const validator = require('validator');
const user = mongoose.Schema({
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

});
module.exports = mongoose.model('User', user);