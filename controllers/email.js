
const Send= require ('../models/email');
    exports.sendEmail = (req,res) =>{
        const user = new Send(req.body);
        user.save()
        .then(() => {
          res.status(200).json({ message: 'Email envoyer avecsuccess' });
        })
        .catch((err) => {
          console.error(err.message);
          res.status(500).json({ message: 'Email error' });
        })
    }

