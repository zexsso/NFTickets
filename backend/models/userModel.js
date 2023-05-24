const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    creator: { type: Boolean, required: true },
    walletAddress: { type: String } 
});

module.exports = mongoose.model('User', userSchema);