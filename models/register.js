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

});
<<<<<<< HEAD


module.exports = mongoose.model('Test', userRegister);

=======
module.exports = mongoose.model('Register', user);
>>>>>>> 03d86255ec07208b4d6c8c30a933c1355a577ef0
