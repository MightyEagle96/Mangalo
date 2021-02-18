const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'product must have a title'] },
  description: {
    type: String,
    required: [true, 'product must have a description'],
  },
  quantity: { type: Number, default: 0 },
  image: String,
  sellerName: String,
  location: String,
  reviews: { type: Array },
  ratings: {
    type: Number,
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5'],
  },
  price: { type: Number, required: [true, 'product must have a price'] },
  createdAt: { type: Date, default: Date.now() },
  // review: { type: Number , min:0},
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
