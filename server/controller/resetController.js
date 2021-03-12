const User = require('../model/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.reset_get = (req, res) => {
  try {
    res.render('reset.ejs', { message: '' });
  } catch (err) {
    console.log(err);
  }
};

const transport = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USERMAIL,
    pass: process.env.USERPASSWORD,
  },
});

exports.reset_post = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.render('reset.ejs', {
        message: 'Can not find user',
      });
    const cryptoUrl = await crypto.randomBytes(32).toString('hex');

    user.cryptoUrl = cryptoUrl;
    user.cryptoUrlExpiration = Date.now() + 300000;

    await user.save();

    await transport.sendMail({
      from: process.env.USERMAIL,
      to: user.email,
      subject: 'Reset your password',
      html: `<h4>Please follow this <a href="http://localhost:3000/reset/${user.cryptoUrl}">Link</a> to reset password</h4>`,
    });

    res.render('reset.ejs', {
      message: 'Email has been sent, please check your mail',
    });
  } catch (err) {
    res.render('reset.ejs', {
      message: 'Please try again later',
    });
  }
};

exports.verifyCryptoUrl_get = async (req, res) => {
  const cryptoUrl = req.params.cryptoUrl;

  try {
    const user = await User.findOne({
      cryptoUrl: cryptoUrl,
      cryptoUrlExpiration: { $gt: Date.now() },
    });

    if (!user) return res.redirect('/register');

    res.render('resetForm.ejs', { email: user.email, message: '' });
  } catch (err) {
    console.log(err);
  }
};

exports.resetPasswordForm_post = async (req, res) => {
  const newPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });
    if (newPassword !== confirmPassword) {
      req.flash('warning_msg', 'passwords does not match');
      res.redirect('back');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.save();
    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
};
