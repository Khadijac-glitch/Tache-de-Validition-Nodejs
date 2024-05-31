// const express = require('express');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const router = express.Router();

// router.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = new User({ username, password });
//         await user.save();
//         res.status(200).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(400).json({ error: 'User registration failed' });
//     }
// });

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (user && (await user.matchPassword(password))) {
//             const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
//             res.json({ token });
//         } else {
//             res.status(401).json({ error: 'Invalid username or password' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: 'User login failed' });
//     }
// });

// module.exports = router;
