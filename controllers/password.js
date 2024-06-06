const User = require('../models/password');

exports.createPassword = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send('Le nom d\'utilisateur et le mot de passe sont requis');
    }

    const user = new User({ username, password });

    await user.save();
    res.status(201).send('Utilisateur créé avec succès');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send('Le nom d\'utilisateur existe déjà');
    }
    res.status(500).send('Erreur lors de la création de l\'utilisateur');
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    user.password = newPassword;
    await user.save();
    res.send('Mot de passe modifié avec succès');
  } catch (error) {
    res.status(500).send('Erreur lors de la modification du mot de passe');
  }
};

exports.adminChangePassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    user.password = newPassword;
    await user.save();
    res.send('Mot de passe utilisateur modifié avec succès');
  } catch (error) {
    res.status(500).send('Erreur lors de la modification du mot de passe utilisateur');
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
};
