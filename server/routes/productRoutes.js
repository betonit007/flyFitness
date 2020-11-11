const express = require('express')
const router = express.Router()
const { getProductById, getProducts } = require('../controllers/productControllers')

//Get all Products
router.get('/', getProducts)

//Get product by id
router.get('/:id', getProductById)

module.exports = router