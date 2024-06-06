const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.sendStatus(403);
    }
    next();
};

module.exports = { authenticateToken, isAdmin };

// const express = require('express');
// const { authenticateToken, isAdmin } = require('./path-to-middleware');
// const app = express();

// app.get('/admin', authenticateToken, isAdmin, (req, res) => {
//     res.send('Welcome Admin!');
// });
