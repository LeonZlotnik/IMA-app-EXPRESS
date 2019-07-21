const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');

router.get('/ventas', (req, res) => {
  Product.find()
    .then(product => {
      res.render('ventas', {
        product
      });
    }).catch(err => console.log(err))
})

router.get('/ventas', (req, res) => {
  Product.findOne({
      _id: req.query._id
    })
    .then(p => {
      res.render('/perfil', {
        p
      })
    })
    .catch(err => console.log(err))
})

router.post('/ventas/:id', (req, res) => {
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