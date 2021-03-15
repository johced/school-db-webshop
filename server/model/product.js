const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String },
  img: {
    data: Buffer,
    contentType: String,
  },
  description: { type: String },
  price: { type: Number },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
