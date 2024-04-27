const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = 4000;

const prisma = new PrismaClient();

app.use(cors());

app.get('/data', async (req, res) => {
  try {
    const sellers = await prisma.seller.findMany({
      select: {
        name: true,
        email: true,
        password: true,
        phoneNumber: true,
        address: true,
        gstNumber: true,
        accountNumber: true,
        IFSC: true,
        bankName: true,
      },
    });
    res.json({ sellers });
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error.code === 'P1012') {
      res.status(500).json({ error: 'Failed to connect to the database' });
    } else {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
