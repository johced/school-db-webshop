const User = require('../model/user');
const Cart = require('../model/cart');

exports.orderList_get = async (req, res) => {
  const { productId, quantity, title, price } = req.body;
  let total = price * quantity;
  const user = await User.findOne({ _id: req.user.userDB._id });
  const userId = user;
  totalAmount = '';
  let myTotal = total;
  let myTotalAmount = 0;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // *** CART EXIST FOR USER ***
      let indexItem = cart.products.findIndex((p) => p.productId == productId);

      if (indexItem > -1) {
        // *** product exists in the cart, UPDATE QUANTITY ***
        let productItem = cart.products[indexItem];
        productItem.quantity = quantity;
        cart.products[indexItem] = productItem;

        // *** product exists in cart, UPDATE TOTAL IN PRODUCTS ***
        let productTotalPrice = cart.products[indexItem];
        productTotalPrice.total = total;
        cart.products[indexItem] = productTotalPrice;

        // *** product exists in cart, TO UPDATE TOTALAMOUNT ***
        for (i = 0; i < cart.products.length; i++) {
          myTotalAmount += cart.products[i].total;
          cart.totalAmount = myTotalAmount;
        }
      } else {
        for (i = 0; i < cart.products.length; i++) {
          myTotal += cart.products[i].total;
          cart.totalAmount = myTotal;
        }

        // *** If user have removed all items, this code runs ***
        if (cart.totalAmount == 0) {
          cart.totalAmount = myTotal;
        }

        cart.products.push({ productId, quantity, title, price, total });
      }
      cart = await cart.save();
      res.redirect('/shoppingcart');
    } else {
      // *** NO CART - CREATE NEW ***
      await Cart.create({
        totalAmount,
        userId,
        products: [{ productId, quantity, title, price, total }],
      });
      let cart = await Cart.findOne({ userId });
      for (i = 0; i < cart.products.length; i++) {
        myTotal = cart.products[i].total;
        cart.totalAmount = myTotal;
      }

      await cart.save();
      res.redirect('/shoppingcart');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

exports.checkoutShow_get = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userDB._id });
  const userId = user;
  try {
    const cart = await Cart.findOne({ userId }).populate('userId');

    if (cart == null) req.flash('warning_msg', 'You have to add some products first!');

    res.render('shoppingCart.ejs', {
      orders: cart.products,
      user: req.user.userDB,
      totalAmount: cart.totalAmount,
    });
  } catch (err) {
    res.redirect('back');
    console.log(err);
  }
};

exports.removeItem_get = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userDB._id });
  const userId = user;
  try {
    const cart = await Cart.findOne({ userId });

    const productId = req.params.id;

    for (i = 0; i < cart.products.length; i++) {
      if (productId == cart.products[i]._id) {
        productTotal = cart.products[i].total;
        dataBaseTotalAmount = cart.totalAmount;
        dataBaseTotalAmount -= productTotal;
        cart.totalAmount = dataBaseTotalAmount;
        if (cart.totalAmount <= 0) {
          cart.totalAmount = 0;
        }
        await cart.save();
      }
    }

    cart.products.pull({ _id: productId });
    cart.save();
    res.redirect('/shoppingcart');
  } catch (err) {
    console.log(err);
  }
};

exports.reduceInCart_get = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userDB._id });
  const userId = user;

  const productId = req.params.id;
  try {
    const cart = await Cart.findOne({ userId });
    for (i = 0; i < cart.products.length; i++) {
      if (cart.products[i]._id == productId) {
        if (cart.products[i].quantity == 1) {
          break;
        } else {
          let oldValue = cart.products[i].total;
          cart.products[i].quantity--;
          cart.products[i].total = cart.products[i].quantity * cart.products[i].price;

          let newValue = cart.products[i].total;
          cart.totalAmount -= oldValue;
          cart.totalAmount += newValue;

          await cart.save();
        }
      }
    }
    res.redirect('/shoppingcart');
  } catch (err) {
    console.log(err);
  }
};

exports.addInCart_get = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userDB._id });
  const userId = user;
  const productId = req.params.id;
  try {
    const cart = await Cart.findOne({ userId });
    for (i = 0; i < cart.products.length; i++) {
      if (cart.products[i]._id == productId) {
        let oldValue = cart.products[i].total;
        cart.products[i].quantity++;
        cart.products[i].total = cart.products[i].quantity * cart.products[i].price;

        let newValue = cart.products[i].total;
        cart.totalAmount -= oldValue;
        cart.totalAmount += newValue;

        await cart.save();
      }
    }

    res.redirect('/shoppingcart');
  } catch (err) {
    console.log(err);
  }
};
