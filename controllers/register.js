// // const jwt = require("jsonwebtoken");
// // const { validationResult } = require('express-validator');
// // const bcrypt = require('bcryptjs'); 
// // const User = require("../models/register");


// // // Controller pour l'inscription d'un nouvel utilisateur

// // exports.createUser = async (req, res) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({ errors: errors.array() });
// //     }
  
// //     const { firstName, lastName,email,number, password,confirmPassword, role } = req.body;
  
// //     try {
// //       let user = await User.findOne({ email });
  
// //       if (user) {
// //         return res.status(400).json({ errors: [{ msg: 'Utilisateur existe déjà' }] });
// //       }
  
// //       // Crypterle mdp
// //       const salt = await bcrypt.genSalt(10);
// //       const crytPassword = await bcrypt.hash(password, salt);
// //       console.log(crytPassword);
  
// //       user = new User({
// //         firstName,
// //         lastName,
// //         email,
// //         number,
// //         password: crytPassword,
// //         confirmPassword,
// //         role
// //       });
  
// //       await user.save(); 
  
// //       return res.status(200).json({ msg: 'Inscription réussie' });
  
// //     } catch (err) {
// //       console.error(err.message);
// //       res.status(500).send('Erreur du serveur');
// //     }
// //   };


// const jwt = require("jsonwebtoken");
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs'); 
// const User = require("../models/register");
// const nodemailer = require('nodemailer');

// // Configurez Nodemailer avec vos paramètres
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: "passpartoutsn@gmail.com",
//     pass: "afaq ywrb asby baky",
//   }
// });

// // Contrôleur pour l'inscription d'un nouvel utilisateur
// exports.createUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { firstName, lastName, email, number, password, role } = req.body;

//   try {
//     // Vérifier si l'utilisateur existe déjà
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ errors: [{ msg: 'Utilisateur existe déjà' }] });
//     }

//     // Crypter le mot de passe
//     const salt = await bcrypt.genSalt(10);
//     const cryptPassword = await bcrypt.hash(password, salt);

//     // Créer un nouvel utilisateur
//     user = new User({
//       firstName,
//       lastName,
//       email,
//       number,
//       password: cryptPassword,
//       role
//     });

//     // Enregistrer l'utilisateur dans la base de données
//     await user.save();

//     // Envoi de l'email de confirmation
//     sendConfirmationEmail(user.email);

//     // Répondre avec un message de succès
//     return res.status(200).json({ msg: 'Inscription réussie. Un email de confirmation a été envoyé à votre adresse.' });

//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).send('Erreur du serveur');
//   }
// };

// // Fonction pour envoyer l'email de confirmation
// function sendConfirmationEmail(userEmail) {
//   const mailOptions = {
//     from: 'passpartoutsn@gmail.com',
//     to: userEmail,
//     subject: 'Confirmation d\'inscription',
//     text: 'Votre inscription a été confirmée. Vous pouvez maintenant vous connecter.'
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email de confirmation envoyé: ' + info.response);
//     }
//   });
// }


const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); 
const User = require("../models/register");
const nodemailer = require('nodemailer');

// Configurez Nodemailer avec vos paramètres
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "passpartoutsn@gmail.com",
    pass: "afaq ywrb asby baky",
  }
});

// Contrôleur pour l'inscription d'un nouvel utilisateur
exports.createUser = async (req, res) => {
<<<<<<< HEAD
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, number, password, role } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'Utilisateur existe déjà' }] });
=======
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
  
      return res.status(201).json({ firstName: user.firstName, lastName: user.lastName ,email:user.email, _id:user._id });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
>>>>>>> 04626f718f56496c80ccdbc9a894c1c4607fc034
    }

    // Crypter le mot de passe
    const salt = await bcrypt.genSalt(10);
    const cryptPassword = await bcrypt.hash(password, salt);

    // Créer un nouvel utilisateur
    user = new User({
      firstName,
      lastName,
      email,
      number,
      password: cryptPassword,
      role
    });

    // Enregistrer l'utilisateur dans la base de données
    await user.save();

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "your_jwt_secret",
      { expiresIn: '1h' } // Durée de validité du token (1 heure dans cet exemple)
    );

    // Construire le lien de connexion avec le token
    const loginLink = `http://yourdomain.com/login?token=${token}`;

    // Envoi de l'email avec le lien de connexion
    sendLoginEmail(user.email, loginLink);

    // Répondre avec un message de succès
    return res.status(200).json({ msg: 'Inscription réussie. Un email de confirmation a été envoyé à votre adresse.' });

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Erreur du serveur');
  }
};

// Fonction pour envoyer l'email de connexion
function sendLoginEmail(userEmail, loginLink) {
  const mailOptions = {
    from: 'passpartoutsn@gmail.com',
    to: userEmail,
    subject: 'Lien de connexion à votre compte',
    html: `<p>Vous pouvez vous connecter à votre compte en suivant ce <a href="${loginLink}">lien</a>.</p>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email de connexion envoyé: ' + info.response);
    }
  });
}



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



// then((utilisateur) => {
//   return res.status(201).json({utilisateur})
//  })