const Product = require('../model/product');

exports.showStart = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('index.ejs', {
      products,

      message: '',
    });
  } catch (err) {
    console.log(err);
  }
};

// *** Logout ***
exports.logout_get = (req, res) => {
  res.clearCookie('jwtToken');
  req.flash('success_msg', 'You are now logged out!');
  res.redirect('/');
};
