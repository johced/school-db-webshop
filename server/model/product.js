const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    title: { type: String },
    description: { type: String },
    price: { type: Number },
    date: { type: Date, default: Date.now },

})

const Product = mongoose.model("product", productSchema);

module.exports = Product;