const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
  },
});
<<<<<<< HEAD

const User = mongoose.model('Sser', userSchema);
=======
const User = mongoose.model('Password', userSchema);
>>>>>>> 03d86255ec07208b4d6c8c30a933c1355a577ef0
module.exports = User;
