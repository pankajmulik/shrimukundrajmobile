const express = require('express')
const router = express.Router()
const { addProduct, getAllproducts, deleteproduct, updateProduct, getoneproduct }=require('../smmcotroller/smmcotroller')

router.get('/', getAllproducts)
router.post('/add',addProduct)

router.delete('/:id', deleteproduct)

router.patch('/:id', updateProduct)

router.get("/:id", getoneproduct)

module.exports=router








