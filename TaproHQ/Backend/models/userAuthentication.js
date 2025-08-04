const mongoose = require('mongoose');

const userAuthenticationSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    user_type: {type: String, required: true },
    
});

module.exports = mongoose.model('userAuthentication', userAuthenticationSchema);