const User = require ('../models/connexion');

exports.createUser = (req, res) => {
    // console.log(req.body);
    const user = new User(req.body);
   prod.save()
   .then((utilisateur) => {
    return res.status(201).json({utilisateur})
   })
   .catch((error) => { return res.status(400).json({error}) });
}
exports.getOneUser = (req, res) => {
    const user = req.params.id;
    console.log(user);
   User.find({user:user})
    // if (!prod) return res.status(404).send('Produit not found!'); 
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