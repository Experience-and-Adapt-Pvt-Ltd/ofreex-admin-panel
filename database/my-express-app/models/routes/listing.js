const express = require('express');
const router = express.Router();
const Listing = require('../listing_schema');


router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/addlisting', async (req, res) => {
  try {
    const { id,title, description, category, subCategory, condition, price, city, state, imageUrls, userId, postedAt, rating, discount, delivery, quantity } = req.body;
    
    const newListing = new Listing({id,
      title,
      description,
      category,
      subCategory,
      condition,
      price,
      city,
      state,
      imageUrls,
      userId,
      postedAt,
      rating,
      discount,
      delivery,
      quantity
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to add listing" });
  }
});

module.exports = router;
