const User = require('../model/user');
const Product = require('../model/product');
const fs = require('fs');
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
    res.redirect('/showAdminProducts');
  } catch (err) {
    req.flash('warning_msg', 'Wrong image type, Only png, jpeg & gif');
    res.redirect('/addProduct');
  }
};

exports.showAdminProduct_get = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userDB._id }).populate('productList');

  res.render('showAdminProducts.ejs', { products: user.productList, err: '' });
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
    const user = await User.findOne({ _id: req.user.userDB._id }).populate('poductList');
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
