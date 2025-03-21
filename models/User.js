const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  referrals: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);
