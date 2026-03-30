const express = require('express');
const auth = require('../middleware/auth');
const Hotel = require('../models/hotel');
const ContactInfo = require('../models/contactInfo');
const contactInfo = require('../models/contactInfo');

const router = express.Router();

router.get('/', auth, auth.isAdmin, async (req, res) => {
  const hotels = await Hotel.find({ userId: req.user.id }).populate('contactInfo');
  res.json(hotels);
});

router.get('/:hotelId', auth, auth.isAdmin, async (req, res) => {
  const hotel = await Hotel.findOne({
    _id: req.params.hotelId,
    userId: req.user.id
  }).populate('contactInfo');

  if (!hotel) return res.status(404).json({ msg: 'hotel not found' });
  res.json(hotel);
});

router.post('/', auth, auth.isAdmin, async (req, res) => {
  const contactinfo = new ContactInfo(req.body.contactInfo);
  await contactinfo.save();

  const hotel = new Hotel({
    ...req.body,
    contactInfo: contactinfo._id,
    userId: req.user.id
  });

  await hotel.save();
  res.json(hotel);
});

router.put('/:hotelId', auth, auth.isAdmin, async (req, res) => {
  try {
    
    const hotel = await Hotel.findOne({ _id: req.params.hotelId, userId: req.user.id });
    if (!hotel) return res.status(404).json({ msg: 'hotel not found' });
    // as we save contactInfo as id in mongo db we must seprate that contact info 
    // and then save it and update both
    const {contactInfo,...hotelData}=req.body;
    Object.assign(hotel,hotelData);
    if(contactInfo&&hotel.contactInfo){
      await ContactInfo.findByIdAndUpdate(hotel.contactInfo,contactInfo,{returnDocument:'after',runValidators:true});
    }
    await hotel.save();
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ msg: 'server erroe' });
  }

})

module.exports = router;