const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true , unique: true },
  user_type: { type: String, required: true },
  password: { type: String, required: true },
  joined_date: { type: Date, default: Date.now },
  location: { type: String, required: false }
});

module.exports = mongoose.model('userInfo', userInfoSchema);
