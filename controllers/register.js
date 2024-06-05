// const User = require ('../models/register');

// exports.createUser = (req, res) => {
//     const { token } = req.body; 
//     const user = new User(req.body);
//     user.save()
//    .then((utilisateur) => {
//     return res.status(201).json({utilisateur})
//    })
//    .catch((error) => { return res.status(400).json({error}) });
// }
// exports.createAdminUser = (req, res) => {
//     console.log(req.body);
//     const user = new User(req.body);
//     user.save()
//    .then((utilisateur) => {
//     return res.status(201).json({utilisateur})
//    })
//    .catch((error) => { return res.status(400).json({error}) });
// }

const jwt = require('jsonwebtoken');
const User = require('../models/register');

exports.createUser = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then((utilisateur) => {
            const token = jwt.sign({ id: utilisateur._id, role: utilisateur.role }, 'secret_key', { expiresIn: '1h' });
            return res.status(201).json({ utilisateur, token });
        })
        .catch((error) => { return res.status(400).json({ error }) });
}

exports.createAdminUser = (req, res) => {
    const user = new User(req.body);
    user.role = 'admin';
    user.save()
        .then((utilisateur) => {
            const token = jwt.sign({ id: utilisateur._id, role: utilisateur.role }, 'secret_key', { expiresIn: '1h' });
            return res.status(201).json({ utilisateur, token });
        })
        .catch((error) => { return res.status(400).json({ error }) });
}

exports.getOneUser = (req, res) => {
    const user = req.params.id;
    console.log(user);
   User.find({user:user})
    .then ((utilisateur) =>{
     return res.status(200).json({utilisateur})} )
    .catch((error) =>{
        console.log(error);
     return res.status(400).json({error}) });
}

exports.patchUser = (req, res) => {
    const user = req.params.id;
    console.log(user);
   User.findByIdAndUpdate(user,req.body,{
        new:true,
        runValidators:true
    })
    .then ((utilisateur) =>{
        return res.status(200).json({utilisateur})} )
       .catch((error) =>{
           console.log(error);
        return res.status(400).json({error}) });
        
    }
    exports.patchAdmin = (req, res) => {
        const user = req.params.id;
        console.log(user);
       User.findByIdAndUpdate(user,req.body,{
            new:true,
            runValidators:true
        })
        .then ((utilisateur) =>{
            return res.status(200).json({utilisateur})} )
           .catch((error) =>{
               console.log(error);
            return res.status(400).json({error}) });
        }
    exports.deleteUser = (req, res) => {
        const user = req.params.id;
        console.log(user);
       User.findByIdAndDelete(user)
        .then ((utilisateur) =>{
            return res.status(200).json({utilisateur})} )
           .catch((error) =>{
               console.log(error);
            return res.status(400).json({error}) });
        }
        exports.deleteAdmin = (req, res) => {
            const user = req.params.id;
            console.log(user);
           User.findByIdAndDelete(user)
            .then ((utilisateur) =>{
                return res.status(200).json({utilisateur})} )
               .catch((error) =>{
                   console.log(error);
                return res.status(400).json({error}) });
            }