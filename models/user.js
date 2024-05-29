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


// users.statics.findUser = async(email, password) => {
//     const user = await User.findOne({'email': email});
//     if (!user) throw new Error('Erreur, pas possible de se connecter!');
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) throw new Error('Erreur, pas possible de se connecter!');
//     return user;
// }

const User = mongoose.model("User", users)
module.exports = User;