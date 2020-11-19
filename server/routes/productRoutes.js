const express = require('express')
const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware')
const { getProductById, getProducts, deleteProduct, createProduct, updateProduct } = require('../controllers/productControllers')

//Get all Products
router.route('/')
.get(getProducts)
.post(protect, admin, createProduct)

//Product by id
router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)


module.exports = router