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
route.post(
  '/addProduct',
  verifyAdmin,
  verifyUser,
  upload.single('image'),
  productController.addProduct_post
);

// *** Delete product ***
route.get(
  '/addProduct/delete/:id',
  verifyAdmin,
  verifyUser,
  productController.deleteAdminProduct_get
);

// *** Edit product ***
route.get('/addProduct/edit/:id', verifyAdmin, verifyUser, productController.editAdminProduct_get);
route.post(
  '/addProduct/edit/:id',
  verifyAdmin,
  verifyUser,
  upload.single('image'),
  productController.editAdminProduct_post
);

// *** Export ***
module.exports = route;
