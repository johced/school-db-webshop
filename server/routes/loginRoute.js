const express = require('express');
const route = express.Router();

// *** Import functions ***
const homeController = require('../controller/homeController');
const registerController = require('../controller/registerController');
const loginController = require('../controller/loginController');

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

// *** Export ***
module.exports = route;
