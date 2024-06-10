<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); 
const User = require("../models/register");


// Controller pour l'inscription d'un nouvel utilisateur

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { firstName, lastName,email,number, password,confirmPassword, role } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Utilisateur existe déjà' }] });
      }
  
      // Crypterle mdp
      const salt = await bcrypt.genSalt(10);
      const crytPassword = await bcrypt.hash(password, salt);
      console.log(crytPassword);
  
      user = new User({
        firstName,
        lastName,
        email,
        number,
        password: crytPassword,
        confirmPassword,
        role
      });
  
      await user.save(); 
  
      return res.status(200).json({ msg: 'Inscription réussie' });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
    }
  };
=======
const UserRegister = require("../models/register");
>>>>>>> 5d8c406dcf031b7e6bce2ef0694a844234b9045c


<<<<<<< HEAD
=======
exports.createAdminUser = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user
    .save()
    .then((utilisateur) => {
      return res.status(201).json({ utilisateur });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
>>>>>>> 5d8c406dcf031b7e6bce2ef0694a844234b9045c
exports.getOneUser = (req, res) => {
  const user = req.params.id;
  console.log(user);
  User.find({ user: user })
    .then((utilisateur) => {
      return res.status(200).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};

exports.patchUser = (req, res) => {
  const user = req.params.id;
  console.log(user);
  User.findByIdAndUpdate(user, req.body, {
    new: true,
    runValidators: true,
  })
    .then((utilisateur) => {
      return res.status(200).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};
<<<<<<< HEAD
//   ADMIN
exports.createAdminUser = (req, res) => {
    const user = new User(req.body);
    user.role = "admin";
    user
      .save()
      .then((utilisateur) => {
        const token = jwt.sign(
          { id: utilisateur._id, role: utilisateur.role },
          "secret_key",
          { expiresIn: "1h" }
        );
        return res.status(201).json({ utilisateur, token });
      })
      .catch((error) => {
        return res.status(400).json({ error });
      });
  };
=======
>>>>>>> 5d8c406dcf031b7e6bce2ef0694a844234b9045c
exports.patchAdmin = (req, res) => {
  const user = req.params.id;
  console.log(user);
  User.findByIdAndUpdate(user, req.body, {
    new: true,
    runValidators: true,
  })
    .then((utilisateur) => {
      return res.status(200).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};
exports.deleteUser = (req, res) => {
  const user = req.params.id;
  console.log(user);
  User.findByIdAndDelete(user)
    .then((utilisateur) => {
      return res.status(200).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};
exports.deleteAdmin = (req, res) => {
  const user = req.params.id;
  console.log(user);
  User.findByIdAndDelete(user)
    .then((utilisateur) => {
      return res.status(200).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};
