const Product = require('../models/productmodels')
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')



const getAllproducts = async (req, res) => {
    const workouts = await Product.find({}).sort({ createdAt: -1 })

    res.status(200).json(workouts)



}
const getoneproduct = async (req, res) => {
    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
    }

    try {

        const product = await Product.findById(id)
        
        if (!product) {
            res.status(400).json({error:"product not found"})
        }
        
res.status(200).json(product)
        
    } catch (error) {

        res.status(500).json({error:"server error"})
        
    }
 

}




const addProduct = async (req, res) => {
    const { category } = req.body;

    console.log(`Received category: ${category}`); // Debug log

    try {
        let newProduct;

        if (category === 'mobiles') {
            const { name, brand, description, battery, display, storage, Network, price, imageUrls } = req.body.mobiles;
            newProduct = new Product({
                category,
                mobiles: {
                    name,
                    brand,
                    description,
                    battery,
                    display,
                    storage,
                    Network,
                    price,
                    imageUrls
                },
                createdAt: Date.now()
            });
        } else if (category === 'smartwatches') {
            const { name, brand, imageUrl, price, description } = req.body.smartwatch;
            newProduct = new Product({
                category,
                smartwatch: {
                    name,
                    brand,
                    imageUrl,
                    price,
                    description
                },
                createdAt: Date.now()
            });
        } else if (category === 'headphones') {
            const { name, brand, imageUrl, price, description } = req.body.headphones;
            newProduct = new Product({
                category,
                headphones: {
                    name,
                    brand,
                    imageUrl,
                    price,
                    description
                },
                createdAt: Date.now()
            });
        }
        else if (category === 'accesories') {
            const { name, brand, imageUrl, price, description } = req.body.accesories;
            newProduct = new Product({
                category,
                accesories: {
                    name,
                    brand,
                    imageUrl,
                    price,
                    description
                },
                createdAt: Date.now()
            });
        } else {
            console.log('Invalid category received'); // Debug log
            return res.status(400).send('Invalid category');
        }

        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        console.log('Error adding product:', error.message); // Debug log
        res.status(500).send('Error adding product: ' + error.message);
    }
};




const deleteproduct = async (req, res) => {

    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
    }
    const workout = Product.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ msg: "deleted successfully" })



}


const updateProduct = async (req, res) => {

    const { id } = req.params


    const { name,brand, price, description, imageUrls } = req.body


        ;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.category = category || product.category;
        // product.updatedAt = Date.now();

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }



}


module.exports = { addProduct, getAllproducts, deleteproduct, updateProduct, getoneproduct }
