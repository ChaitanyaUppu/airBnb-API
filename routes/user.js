const express=require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const auth=require('../middleware/auth');
const User=require('../models/user'); 
const guest=require('../models/guest');
const Booking=require('../models/booking');

const router=express.Router();

router.get('/profile',auth, async (req,res)=>{
    const finduser = await User.findById(req.user.id).select('-password'); // ✅ fixed
    res.json({finduser});
})

/*router.patch('/profile', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const user = await User.findById(req.user.id);
  updates.forEach(update => user[update] = req.body[update]);
  await user.save();
  res.json(user);
});

Object.assign(user,req.body) this can also be used if this i sued 
u can easily change roles which we dont want and 
raw password can be stored in the database

thsi method is safe but it allows all the changes one by one but in case of 
only some feilds need to be changed u cant use this and updating a password 
will directly store the password in this so not a very good practice*/


router.patch('/profile', auth, async (req, res) => {
  try {
    const allowedUpdates = ['name', 'email', 'password'];
    const updates = Object.keys(req.body);

    const isValid = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValid) {
      return res.status(400).json({ msg: 'Invalid fields/updates' });
    }

    const finduser = await User.findById(req.user.id); 

    if (!finduser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    for (let key of updates) {
      if (key === "password") { 
        finduser.password = await bcrypt.hash(req.body.password, 10); 
      } else {
        finduser[key] = req.body[key];
      }
    }

    await finduser.save();

    res.json({
      message: "Profile updated",
      user: finduser
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});
/* to test the above route first sign in u get an token copy that token and in header 
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
then send get request u get data
*/


router.get('/mybookings', auth , async (req,res)=>{
  const bookings = await Booking.find({userId: req.user.id});
  res.json(guests);
})

//guests

router.get('/myguests',auth, async (req,res)=>{
  const guests= await guest.find({userId:req.user.id});
  res.json({guests});
})

module.exports = router;