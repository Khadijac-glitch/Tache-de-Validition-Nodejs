const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(403).json({ msg: 'autorisation refusée' });
    }
  
    try {
      const decode = jwt.verify(token, config.get('jwtSecret'));
      req.user = decode.user;
      next();
    } catch (err) {
<<<<<<< HEAD
      res.status(102).json({ msg: 'Token invalide' });
=======
      res.status(403).json({ msg: 'Token invalide' });
>>>>>>> a43e48a4ae66f6f31c92c07a99a1562cfde9a2ed
    }
  };



