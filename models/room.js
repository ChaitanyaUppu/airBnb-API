const mongoose=require("mongoose");
const hotel = require("./hotel");

const roomSchema = new mongoose.Schema({
      hotelId: { type : mongoose.Schema.Types.ObjectId,ref: 'hotel'},
      type : String,
      basePrice: Number,
      ameneties: [String],
      photos: [String],
      totalCount: Number,
      capacity: Number

},{timestamps: true});

module.exports =mongoose.model('room',roomSchema);

