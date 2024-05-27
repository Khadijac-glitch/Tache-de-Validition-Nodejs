const Password = require ('../models/password');

exports.createPassword = (req, res) => {
    const prod = new Password(req.body);

   prod.save()
   .then((password) => {
    return res.status(201).json({password})
   })
   .catch((error) => { return res.status(400).json({error}) });
}

exports.getOnePassword = (req, res) => {
    const prod = req.params.id;
    console.log(prod);
    Password.find({prod:prod})

    .then ((password) =>{
     return res.status(200).json({password})} )
    .catch((error) =>{
        console.log(error);
     return res.status(400).json({error}) });
}

exports.getAllPasswords = (req,res) =>{
    Password.find()
    .then ((passwords) =>{ return res.status(200).json({passwords})} )
    .catch((error) =>{ return res.status(400).json({error}) });

}









