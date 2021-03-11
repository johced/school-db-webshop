const express = require('express');
const route = express.Router();

// *** Import functions ***
const homeController = require('../controller/homeController');

// *** Start page ***
route.get('/', homeController.showStart);

// *** Export ***
module.exports = route;
