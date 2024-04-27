const express = require('express');
const router = express.Router();
const Seller = require('../sellers_schema');

// Get all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new seller
router.post('/addseller', async (req, res) => {
  try {
    const{id,name,email,password,phoneNumber,address,gstNumber,accountNumber,IFSC,bankName}=req.body
    // const seller = await seller.create({id,name,email,password,phoneNumber,address,gstNumber,accountNumber,IFSC,bankName});
    const seller = new Seller({id,name,email,password,phoneNumber,address,gstNumber,accountNumber,IFSC,bankName});

    await seller.save();
    res.status(201).json(seller);
  } catch (error) {
    console.log(error)
    res.status(400).send("error");
  }
});
module.exports = router;
