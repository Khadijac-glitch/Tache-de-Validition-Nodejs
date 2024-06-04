const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Define a schema
const Schema = mongoose.Schema;

const users = new Schema({
    email: {
        type: String,
        required: true,
        ValidityState(v) {
            if (!validator.isEmail(v)) throw new Error('E-mail non valid!');
        }
    },
    password: {
        type: String,
        required: true,
        validate(v) {
            if (!validator.isLength(v, {min: 4, max: 20} )) throw new Error('le mot de passe doit etre 4 et 20 caractere!');
        }
    }
})


const Users = mongoose.model("Login", users)
module.exports = Users;