require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');   


const dbcconect = async () => {

    try {
        mongoose.connect(process.env.MURL)
       
    }
    catch (error) {
        console.log(error);
    }

}

module.exports = dbcconect;