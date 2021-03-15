const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');

// Multer - add file to uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

// Check that the uploaded file type.
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(console.log(new Error('Wrong file type')));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

// Importfunctions
const verifyAdmin = require('../middleware/verifyAdmin');
const verifyUser = require('../middleware/verifyUser');
const productController = require('../controller/productController');

// Startpage when logged in
route.get('/userStart', verifyUser, productController.userStart_get);

// Add product
route.get('/addProduct', verifyAdmin, verifyUser, productController.addProduct_get);

route.get('/showAdminproducts', verifyAdmin, verifyUser, productController.showAdminProduct_get);

route.post(
  '/addProduct',
  verifyAdmin,
  verifyUser,
  upload.single('image'),
  productController.addProduct_post
);

// *** export ***
module.exports = route;
