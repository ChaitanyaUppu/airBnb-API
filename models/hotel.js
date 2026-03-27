const mongoose =require("mongoose");
const contactInfo = require("./contactInfo");
const { type } = require("os");
const { boolean } = require("webidl-conversions");

const hotelSchema = new mongoose.Schema({
    city: String,
    contactInfo: {type: mongoose.Schema.Types.ObjectId,ref: 'contactInfo'},
    photos: [String],
    amenities: [String],
    active: Boolean,
    userId : {type: mongoose.Schema.Types.ObjectId,ref: 'user'},
},{timestamps: true});

module.exports = mongoose.model('hotel',hotelSchema);