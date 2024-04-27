const express = require('express');
const router = express.Router();
const User = require('../user_schema');

// Get all sellers
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new seller
router.post('/adduser', async (req, res) => {
  try {
    const{id,name,email,image,phoneNumber,hashedPassword,createdAt,updatedAt}=req.body
    // const seller = await seller.create({id,name,email,password,phoneNumber,address,gstNumber,accountNumber,IFSC,bankName});
    const user = new User({id,name,email,image,phoneNumber,hashedPassword,createdAt,updatedAt});

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error)
    res.status(400).send("error");
  }
});
module.exports = router;
