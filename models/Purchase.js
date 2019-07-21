const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  purchaseProductQuantity: {type: Number, default: false}, //es para que no genere errores si hay un empty string.
  productName : String,
  purchaseProductCost: Number,
  purchaseProductPresentation: String,
  purchaseCurrency: String,
  purchaseProductIVA: Number,
  purchaseHomeService: Boolean,
  purchaseHoldAtLocation: {type: Boolean, default: false},
  purchasePickAtWarehouse: Boolean,
  purchaseInsurance: Boolean,
  purchasePayDelivery: Boolean
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;