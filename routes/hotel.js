const express = require('express');
const auth = require('../middleware/auth');
const Hotel = require('../models/hotel');
const ContactInfo = require('../models/contactInfo');

const router = express.Router(); 

router.get('/', auth, auth.isAdmin, async (req, res) => {
  const hotels = await Hotel.find({ userId: req.user.id });
  res.json(hotels);
});

router.get('/:hotelId', auth, auth.isAdmin, async (req, res) => {
  const hotel = await Hotel.findOne({
    _id: req.params.hotelId,
    userId: req.user.id
  });

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

module.exports = router;