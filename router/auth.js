const { check,validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const User = require('../models/register');

// Controller pour la connexion 

// 
router.post('/',
  [
    check('email', 'Veuillez entrer un email valide').isEmail(),
    check('password', 'Veuillez entrer un mot de passe valide').exists()
  ],

  exports.userLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Email invalide' }] });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      console.log(user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ errors: [{ msg: 'Mot de passe invalide' }] });
      }

      console.log("Connexion réussie"); 
      res.send("Connexion réussie bienvenue");
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
    }
  }
);
 module.exports = router;