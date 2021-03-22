const express = require('express');
const route = express.Router();

// *** Import functions ***
const homeController = require('../controller/homeController');
const registerController = require('../controller/registerController');
const loginController = require('../controller/loginController');
const resetController = require('../controller/resetController');

// *** Start page ***
route.get('/', homeController.showStart);

// *** Logout ***
route.get('/logout', homeController.logout_get);

// *** Register ***
route.get('/register', registerController.register_get);
route.post('/register', registerController.register_post);

// *** Login ***
route.get('/login', loginController.login_get);
route.post('/login', loginController.login_post);

// *** Reset Password ***
route.get('/reset', resetController.reset_get);
route.post('/reset', resetController.reset_post);

// *** Resetpasswordform ***
route.get('/reset/:cryptoUrl', resetController.verifyCryptoUrl_get);
route.post('/resetPasswordForm', resetController.resetPasswordForm_post);

// *** Export ***
module.exports = route;
