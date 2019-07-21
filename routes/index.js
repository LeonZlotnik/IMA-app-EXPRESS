const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Chart = require('chart.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/perfil', (req, res) => {
  User.findOne()
    .then(u => {
      res.render('perfil', {
        u
      });
    })
    .catch(err => {
      console.log(err);
    })
})


module.exports = router;
