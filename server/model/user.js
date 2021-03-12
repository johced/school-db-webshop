const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  cryptoUrl: {
    type: String,
  },
  cryptoUrlExpiration: {
    type: Date,
  },
  role: {
    type: String,
  },
});
const User = mongoose.model('user', userSchema);

module.exports = User;
