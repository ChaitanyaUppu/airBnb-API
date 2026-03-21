const mongoose =require("mongoose");

const contactInfoSchema = new mongoose.Schema({
    completeAddress: String,
    location: String,
    email: String,
    phoneNumber: String

},{timestamps: true});

module.exports = mongoose.model('contactInfo',contactInfoSchema);