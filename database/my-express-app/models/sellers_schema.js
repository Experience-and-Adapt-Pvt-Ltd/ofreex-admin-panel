
const mongoose = require('mongoose');
const {Schema} = mongoose;

const sellerSchema = new Schema({
  id:{type: String, required: true},
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, unique: true, required: true },
  address: { type: String },
  gstNumber: { type: String, unique: true },
  accountNumber: { type: String, unique: true },
  IFSC: { type: String },
  bankName: { type: String }
});
// const{Id,name,email,password,phoneNumber,address,gstNumber,accountNumber,IFSC,bankName};

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
