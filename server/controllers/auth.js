const User= require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  
  return jwt.sign({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports.signin = function(req, res, next) {
  // User has already their email and password
  // We just need to give them a token
  // Get user from Local Strategy 'done(null, user)'
  res.send({ token: tokenForUser(req.user) });
}

module.exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  // See if a user with the given email exists
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);

    // If a user with email does exist, return a error
    if (user) return res.status(422).send({ error: 'Email is in use' });

    // If a user with email doesn't exist, create and save user record
    const newUser = new User({
      email,
      password
    });

    newUser.save(err => {
      if (err) return next(err);
    });

    // Respond to request indicating the user was created
    res.json({ token: tokenForUser(newUser) });
  });
}