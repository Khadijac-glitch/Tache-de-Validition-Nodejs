const Password = require ('../models/password');

exports.createNewPassword = (req, res) => {
    const mypassword = new Password(req.body);
    mypassword.save()
   .then((password) => {
    return res.status(201).json({password})
   })
   .catch((error) => { return res.status(400).json({error}) });
}

exports.getAllPassword = (req, res) => {
    const mypassword = req.params.id;
    console.log(mypassword);
    Password.find({mypassword:mypassword})
    
    .then ((password) =>{
     return res.status(200).json({password})} )
    .catch((error) =>{
        console.log(error);
     return res.status(400).json({error}) });
}


exports.patchPassword = (req, res) => {
    const mypassword = req.params.id;
    console.log(mypassword);
    Password.findByIdAndUpdate(mypassword,req.body)
    .then ((password) =>{
        return res.status(200).json({password})} )
       .catch((error) =>{
           console.log(error);
        return res.status(400).json({error}) });
    }

