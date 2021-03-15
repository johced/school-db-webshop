const User = require('../model/user');
const Product = require('../model/product');
const path = require('path');

exports.userStart_get = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('userStart.ejs', {
      user: req.user.userDB,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};
