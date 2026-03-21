const mongoose=require('mongoose')

const paymentSchema= new mongoose.Schema({
    transactionId: String,
    price: Number,
    status: String
},{timestamps: true});

module.exports = mongoose.model('payment',paymentSchema)