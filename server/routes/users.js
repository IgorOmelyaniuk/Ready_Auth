const express = require('express');
const router = express.Router();
const passport = require('passport');

const Auth = require('../controllers/auth');
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', requireAuth, (req, res) => {
  console.log('11111')
  res.send({ message: 'Hi' });
});

router.post('/signin', requireSignin, Auth.signin);
router.post('/signup', Auth.signup);

module.exports = router;