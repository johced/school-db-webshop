const express = require('express');
const route = express.Router();

// Import functions

const verifyUser = require('../middleware/verifyUser');
const wishListController = require('../controller/wishListController');

// Wishlist Page

route.get('/wishlist', verifyUser, wishListController.wishListShow_get);
route.get('/wishlist/:id', verifyUser, wishListController.wishList_get);

// Delete wish
route.get('/wishlist/delete/:id', verifyUser, wishListController.deleteWish_get);

module.exports = route;
