const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Créer un nouvel utilisateur
router.post('/create', async (req, res) => {
    const { username, password, email, role } = req.body;
    
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, role });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
});

// Lister tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});

// Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { username, email, role }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
});

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
});

module.exports = router;

