const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');

router.get('/productos', (req, res) => {
  res.render('productos');
})

router.post('/productos', (req, res) => {
  const producto = new Product({
    productName: req.body.productName,
    productCode: req.body.productCode,
    productSpecification: req.body.productSpecification,
    // productQuantity: req.body.productQuantity,
    productUnitMeasurement: req.body.productUnitMeasurement,
    productUnitCost: req.body.productUnitCost,
    productCurrency: req.body.productCurrency,
    productPackage: req.body.productPackage,
    productPresentation: req.body.productPresentation,
    productDimensions: req.body.productDimensions,
    productHS: req.body.productHS,
    productIVA: req.body.productIVA,
    productIGI: req.body.productIGI,
  })

  producto.save()
    .then(p => {
      console.log(p)
      res.redirect('/perfil');
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/partial/product-showcase', (req, res) => {
  Product.find()
    .then(p => {
      Purchase.find()
        .then(purchase => {
          var q = purchase.map((e, i) => {
            return e.purchaseProductQuantity;
          });
          console.log(q)
          res.render('product-showcase', {
            p
          });
        })
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;


//Purchase.find()
//.then(pur => {
//var eq = productQuantity - purchaseProductQuantity;
//console.log(eq)