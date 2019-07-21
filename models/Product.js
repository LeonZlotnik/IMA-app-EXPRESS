const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productID: String,
  productCode: String,
  productName: String,
  productSpecification: String,
  productQuantity: Number,
  productBatch: String,
  productUnitMeasurement: String,
  productUnitCost: Number,
  productCurrency: String,
  productIVA: Number,
  productIGI: Number,
  productPackage: String,
  productPresentation: Number,
  productDimensions: Number,
  productHS: String,
  productWarehouse: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;