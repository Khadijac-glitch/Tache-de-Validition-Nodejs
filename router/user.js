const express = require('express');
const User = require('../models/Users');
const router = express.Router();

router.post('/login', async (req, res) => {
    try{
     const user = await User.findUser(req.body.email, req.body.password);
     res.send(user);
    }catch(e) {
        console.log(e)
        res.status(400).send(e);
    }
});


module.exports = router;