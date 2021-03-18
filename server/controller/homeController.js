const Product = require('../model/product');

exports.showStart = async (req, res) => {
  const page = +req.query.page || 1;
  try {
    const totalProducts = await Product.countDocuments();
    const limitPerPage = 2;
    const totalPages = Math.ceil(totalProducts / limitPerPage);
    const productsToShow = limitPerPage * page;
    const products = await Product.find().limit(productsToShow);
    res.render('index.ejs', {
      products,
      page,
      totalProducts,
      totalPages,
      limitPerPage,
      productsToShow,
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
