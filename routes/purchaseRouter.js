const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');

router.get('/compras', (req, res) => {
  Product.find()
    .then(product => {
      res.render('compras', {
        product
      });
    }).catch(err => console.log(err))
})

router.get('/compras', (req, res) => {
  Product.findOne({
      _id: req.query._id
    })
    .then(p => {
      res.render('/perfil',{p})
    })
    .catch(err => console.log(err))
})

router.post('/compras/:id', (req, res) => {
  const {
    productQuantity
  } = req.body
  Product.updateOne({
      _id: req.params.id
    }, {
      $set: {
    productQuantity
            }
    })
    .then(p => {
      res.redirect('/perfil')
    })
    .catch(err => console.log(err))
})

module.exports = router;