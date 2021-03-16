const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      quantity: { type: Number, default: 0 },
      title: { type: String },
      price: { type: Number },
      productId: { type: String },
      total: { type: Number },
    },
  ],
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  totalAmount: { type: Number },
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;

cartSchema.methods.addToCart = async function (productId) {
  this.userId.push(productId);
  await this.save();
};
