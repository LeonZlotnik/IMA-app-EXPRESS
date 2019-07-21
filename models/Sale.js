const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  saleProductQuantity: Number,
  saleProductPrice: Number,
  saleProductPresentation: Number,
  saleCurrency: String,
  saleProductIVA: Number,
  saleHomeService: Boolean,
  saleHoldAtLocation: Boolean,
  salePickAtWarehouse: Boolean,
  saleInsurance: Boolean,
  salePayDelivery: Boolean
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;