const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require("passport");

router.get('/usuarios', (req, res) => {
  res.render('usuarios');
})

router.post('/usuarios', (req, res) => {
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  const usuario = new User({
    username: req.body.username,
    email: req.body.email,
    companyName: req.body.companyName,
    taxAddress: req.body.taxAddress,
    deliveryAddress: req.body.deliveryAddress,
    password: hashPass
  })
  usuario.save()
    .then(u => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/index', (req, res) => {
  res.render('perfil');
});

router.post('/index', passport.authenticate("local", {
  successRedirect: "/perfil",
  failureRedirect: "/index",
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/signin', (req, res) => {
  res.render('signin');
})

router.post('/signin', (req, res) => {
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  const usuario = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPass
  })
  usuario.save()
    .then(u => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;
