require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productsmm')
const accessroute=require('./routes/accessroute')
const app = express();
const port = process.env.PORT || 8080;
const MURL = process.env.MURL;
const {bodyparser}=require('body-parser')
const dbconect = require('./config/dbconnect');
const session = require('express-session');

dbconect();

app.use(cors());
app.use(express.json());

const middleware = (req, res, next) => {
    console.log('Middleware executed');
    next();
};



app.use(middleware);
app.use('/smm/santu/admin', userRoute);
app.use('/smm/dukan/products', productRoute);
app.use('/new/admin/santu/code/to/acess',accessroute)
// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  
});






