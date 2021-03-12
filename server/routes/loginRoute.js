const express = require('express');
const route = express.Router();

// *** Import functions ***
const homeController = require('../controller/homeController');
const registerController = require('../controller/registerController');

// *** Start page ***
route.get('/', homeController.showStart);

// *** Register ***
route.get('/register', registerController.register_get);
// route.post('/register', registerController.register_post)

// *** Export ***
module.exports = route;
