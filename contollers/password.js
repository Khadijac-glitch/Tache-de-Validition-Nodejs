const bcrypt = require('bcryptjs');
const User = require('../models/password');

exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Nom d\'utilisateur et mot de passe sont requis.');
        }
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('Utilisateur déjà existant.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(201).send('Utilisateur créé avec succès.');
    } catch (error) {
        console.error('Erreur du serveur:', error);
        res.status(500).send('Erreur du serveur.');
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { username, oldPassword, newPassword } = req.body;

        if (!username || !oldPassword || !newPassword) {
            return res.status(400).send('Tous les champs sont requis.');
        }
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé.');
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).send('Ancien mot de passe incorrect.');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).send('Mot de passe mis à jour avec succès.');
    } catch (error) {
        console.error('Erreur du serveur:', error);
        res.status(500).send('Erreur du serveur.');
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        let users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).send('Aucun utilisateur trouvé.');
        }

        res.status(200).send(users);
    } catch (error) {
        console.error('Erreur du serveur:', error);
        res.status(500).send('Erreur du serveur.');
    }
};
