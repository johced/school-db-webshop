const express = require('express');
const route = express.Router();

const path = require('path');

// Importfunctions

const verifyUser = require('../middleware/verifyUser');
const productController = require('../controller/productController');

// Startpage when logged in
route.get('/userStart', verifyUser, productController.userStart_get);

// *** export ***
module.exports = route;
