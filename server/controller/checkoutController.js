const User = require('../model/user');
const Cart = require('../model/cart');
const nodemailer = require('nodemailer');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.checkout_get = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userDB._id });
  const userId = user;
  const cart = await Cart.findOne({ userId });

  try {
    if (cart.products.length <= 0 || !cart.products) return res.redirect('/userStart');
    const session = await stripe.checkout.sessions.create({
      success_url: 'https://school-db-webshop.herokuapp.com/success',
      cancel_url: 'http://school-db-webshop.herokuapp.com/shoppingCart',
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: cart.products.map((product) => {
        return {
          name: product.title,
          amount: product.price * 100,
          quantity: product.quantity,
          currency: 'sek',
        };
      }),
      mode: 'payment',
    });
    res.render('checkout.ejs', { user, cart, sessionId: session.id });
  } catch (err) {
    console.log(err);
  }
};

const transport = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USERMAIL,
    pass: process.env.USERPASSWORD,
  },
});

exports.shoppingSuccess = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userDB._id });
  const userId = user;
  const cart = await Cart.findOne({ userId });

  try {
    cart.products = [];
    cart.totalAmount = 0;
    await cart.save();

    res.render('success.ejs', { user });

    await transport.sendMail({
      from: process.env.USERMAIL,
      to: user.email,
      subject: 'Order confirmation',
      html: `<h4>Thank you for shopping with us</h4>`,
    });
  } catch (err) {
    console.err;
  }
};
