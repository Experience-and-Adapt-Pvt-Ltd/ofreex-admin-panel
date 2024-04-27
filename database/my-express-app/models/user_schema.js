const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String },
  email: { type: String, unique: true },
  image: { type: String },
  hashedPassword: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
