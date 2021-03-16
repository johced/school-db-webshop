const express = require('express');
const route = express.Router();

// Importfunctions
const verifyUser = require('../middleware/verifyUser');
const shoppingController = require('../controller/shoppingController');
// const checkoutController = require('../controller/checkoutController');

// add to cart
route.post('/addtocart/', verifyUser, shoppingController.orderList_get);

// // show checkout
route.get('/shoppingcart', verifyUser, shoppingController.checkoutShow_get);

// //remove item
route.get('/shoppingcart/remove/:id', verifyUser, shoppingController.removeItem_get);

// add/reduce amount item
route.get('/reduceincart/:id', verifyUser, shoppingController.reduceInCart_get);
route.get('/addincart/:id', verifyUser, shoppingController.addInCart_get);

// Checkout page
// route.get('/checkout', verifyUser, checkoutController.checkout_get);
// route.get('/success', verifyUser, checkoutController.shoppingSuccess);

module.exports = route;
