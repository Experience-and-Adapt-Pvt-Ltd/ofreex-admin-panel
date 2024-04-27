const express = require('express');
const mongoose = require('mongoose');
const sellerRoutes = require('./models/routes/sellers');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
const PORT = process.env.PORT || 3001;


const MONGODB_URI = 'mongodb+srv://batrarakshit12:Rakshit1@cluster0.bruv9s5.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


app.use(express.json());


app.use('/sellers', require("./models/routes/sellers"));
app.use('/users', require("./models/routes/users"));
app.use('/listing', require("./models/routes/listing"));
app.get('/' , (req,res)=>{
    res.send('Hello world')

})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
