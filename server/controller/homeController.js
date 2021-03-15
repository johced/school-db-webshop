const Product = require('../model/product')

exports.showStart = (req, res) => {
  const products = await Product.find();
  res.render('index.ejs', {
    products,
  });
};

// *** Logout ***
exports.logout_get = (req, res) => {
  res.clearCookie('jwtToken');
  req.flash('success_msg', 'You are now logged out!');
  res.redirect('/');
};
