const User = require('../model/user');
const Product = require('../model/product');
const fs = require('fs');
const path = require('path');

exports.userStart_get = async (req, res) => {
  const page = +req.query.page || 1;
  try {
    const totalProducts = await Product.countDocuments();
    const limitPerPage = 2;
    const totalPages = Math.ceil(totalProducts / limitPerPage);
    const productsToShow = limitPerPage * page;
    const products = await Product.find().limit(productsToShow);
    res.render('userStart.ejs', {
      user: req.user.userDB,
      products,
      page,
      totalProducts,
      totalPages,
      limitPerPage,
      productsToShow,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addProduct_get = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userDB._id }).populate('productList');
    res.render('addProduct.ejs', { products: user.productList, err: '' });
  } catch (err) {
    console.log(err);
  }
};

exports.addProduct_post = async (req, res) => {
  const { title, img, description, price } = req.body;

  try {
    const product = await new Product({
      title: title,
      img: {
        data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
        contentType: 'image',
      },
      description: description,
      price: price,
    }).save();
    const user = await User.findOne({ _id: req.user.userDB._id });

    user.addProduct(product._id);

    req.flash('success_msg', 'Product added!');
    res.redirect('/addProduct');
  } catch (err) {
    req.flash('warning_msg', 'Wrong image type, Only png, jpeg & gif');
    res.redirect('/addProduct');
  }
};

exports.deleteAdminProduct_get = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userDB._id });
    const productId = req.params.id;
    await Product.deleteOne({ _id: productId });
    user.productList.pull({ _id: productId });
    await user.save();
    res.redirect('/addProduct');
  } catch (err) {
    console.log(err);
  }
};

exports.editAdminProduct_get = async (req, res) => {
  const productId = req.params.id;

  try {
    const user = await User.findOne({ _id: req.user.userDB._id }).populate('productList');

    res.render('editProduct.ejs', {
      products: user.productList,
      user: req.user.userDB,
      productId: productId,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editAdminProduct_post = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    await Product.updateOne(
      { _id: req.params.id },
      {
        title: title,
        img: {
          data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
          contentType: 'image',
        },
        description: description,
        price: price,
      }
    );

    res.redirect('/addProduct');
  } catch (err) {
    console.log(err);
  }
};
