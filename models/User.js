const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  contactFirstName: String,
  contactLastName: String,
  email: String,
  companyName: String,
  rfc: String,
  taxAddress: String,
  deliveryAddress: String,
  password: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

