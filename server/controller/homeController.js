exports.showStart = (req, res) => {
  res.render('index.ejs');
};

// *** Logout ***
exports.logout_get = (req, res) => {
  res.clearCookie('jwtToken');
  req.flash('success_msg', 'You are now logged out!');
  res.redirect('/');
};
