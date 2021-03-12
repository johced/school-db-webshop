const User = require('../model/user');

// *** Register ***
exports.register_get = (req, res) => {
  try {
    res.render('register.ejs', { message: '' });
  } catch (err) {
    console.log(err);
  }
};
