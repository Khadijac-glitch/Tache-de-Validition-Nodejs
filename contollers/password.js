const User = require('../models/password');
const bcrypt = require('bcryptjs');

exports.createPassword = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send('Le nom d\'utilisateur et le mot de passe sont requis');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

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
    const { username, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('Ancien mot de passe incorrect');
    }

    user.password = await bcrypt.hash(newPassword, 10);
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

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.send('Mot de passe utilisateur modifié avec succès');
  } catch (error) {
    res.status(500).send('Erreur lors de la modification du mot de passe utilisateur');
  }
};
