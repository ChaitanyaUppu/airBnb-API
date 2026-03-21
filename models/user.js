const mongoose =require('mongoose');

const userSchema =new mongoose.Schema({
 roles: {String},
 name : String,
 email: { type: String,unique: true},
 password: String

},{timestamps: true});

module.exports = mongoose.model('user',userSchema);