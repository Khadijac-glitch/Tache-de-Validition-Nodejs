const User = require ('../models/user');

exports.createUser = (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save()
   .then((utilisateur) => {
    return res.status(201).json({utilisateur})
   })
   .catch((error) => { return res.status(400).json({error}) });
}
