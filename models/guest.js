const mongoose = requie('mongoose');
const guestSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.OnjectId, ref: 'user' },
    name: String,
    gender: String,
    age: Number,

}, { timestamps: true });

module.exports = mongoose.model('guest', guestSchema);