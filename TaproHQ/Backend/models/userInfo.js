const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true },
  user_type: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('userInfo', userInfoSchema);
