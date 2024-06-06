const UserRegister = require("../models/register");

exports.createUser = (req, res) => {
  console.log(req.body);
  const user = new UserRegister(req.body);
  user
    .save()
    .then((utilisateur) => {
      return res.status(201).json({ utilisateur });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
exports.createAdminUser = (req, res) => {
  console.log(req.body);
  const user = new UserRegister(req.body);
  user
    .save()
    .then((utilisateur) => {
      return res.status(201).json({ utilisateur });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
exports.getOneUser = (req, res) => {
  const user = req.params.id;
  console.log(user);
  UserRegister.find({ user: user })
    .then((utilisateur) => {
      return res.status(200).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};

exports.patchUser = (req, res) => {
  const user = req.params.id;
  console.log(user);
  UserRegister.findByIdAndUpdate(user, req.body, {
    new: true,
    runValidators: true,
  })
    .then((utilisateur) => {
      return res.status(200).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};
exports.patchAdmin = (req, res) => {
  const user = req.params.id;
  console.log(user);
  UserRegister.findByIdAndUpdate(user, req.body, {
    new: true,
    runValidators: true,
  })
    .then((utilisateur) => {
      return res.status(200).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};
exports.deleteUser = (req, res) => {
  const user = req.params.id;
  console.log(user);
  UserRegister.findByIdAndDelete(user)
    .then((utilisateur) => {
      return res.status(200).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};
exports.deleteAdmin = (req, res) => {
  const user = req.params.id;
  console.log(user);
  UserRegister.findByIdAndDelete(user)
    .then((utilisateur) => {
      return res.status(200).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};
