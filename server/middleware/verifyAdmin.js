const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAdmin = (req, res, next) => {
  const cookie = req.cookies.jwtToken;
  if (!cookie) return res.render('login.ejs', { message: 'You need to log in' });

  const validUser = jwt.verify(cookie, process.env.SECRET_KEY);

  // console.log(validUser.userDB.role);
  if (!validUser.userDB.role) {
    return res.render('login.ejs', {
      message: 'You have to be admin, pls contact support.',
    });
  }
  if (validUser) {
    req.userDB = validUser;
  }
  next();
};

module.exports = verifyAdmin;
