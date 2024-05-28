   const { username, password } = req.body;

   try{
    const user = User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Success' });
    }

    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password valide' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error');
  }




user.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Méthode pour comparer le mot de passe
  user.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };
