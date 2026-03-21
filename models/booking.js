const mongoose=require('mongoose')

const bookingSchema= new mongoose.Schema({
    hotelId: {type: mongoose.Schema.Types.ObjectId,ref:'hotel'},
    roomId: {type: mongoose.Schema.Types.ObjectId,ref: 'room'},
    userId: {type: mongoose.Schema.Types.ObjectId,ref:'user'},
    status: String,
    checkInDate: Date,
    checkOutDate: Date,
    paymentId: {type: mongoose.Schema.Types.ObjectId,ref:'payemnt'}

},{timestamps: true});

module.exports = mongoose.model('booking',bookingSchema);