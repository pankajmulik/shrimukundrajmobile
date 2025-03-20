// models/Product.js
const mongoose = require('mongoose');


const smartwatchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,

});

// Schema for Headphones category
const headphonesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String }
});

const mobileSchema = new mongoose.Schema({

    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: {
        type: String,
        required: true
    },
    battery: {
        type: String,
        required: true
    },

    display: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    Network: {
        type: String,
        required: true
    },
    price: { type: Number, required: true },
    imageUrls: { type: [String], required: true },

    created_at: { type: Date, default: Date.now }

})


const accesoriesSchema = new mongoose.Schema({

    name: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String }
    
})


// Main Product schema
const productSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['mobiles', 'smartwatches', 'headphones','accesories'],
        required: true
    },
    mobiles: mobileSchema,
    smartwatch: smartwatchSchema,
    headphones: headphonesSchema,
    accesories:accesoriesSchema,
    createdAt: { type: Date, default: Date.now }
})


const Product = mongoose.model('Product', productSchema);



module.exports = Product;
