const mongoose = require('mongoose');
const {Schema} = mongoose;
const listingSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String },
  imageUrls: { type: String},
  userId: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
  rating: { type: Number },
  discount: { type: Number },
  delivery: { type: String },
  quantity: { type: Number }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
