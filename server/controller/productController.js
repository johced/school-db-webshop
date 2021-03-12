const User = require('../model/user');

const path = require('path');

exports.userStart_get = async (req, res) => {
  try {
    res.render('userStart.ejs', {
      user: req.user.userDB,
    });
  } catch (err) {
    console.log(err);
  }
};
