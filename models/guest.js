const mongoose = require('mongoose');
const guestSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: String,
    gender: String,
    age: Number,

}, { timestamps: true });

module.exports = mongoose.model('guest', guestSchema);