const express = require('express')
const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware')
const { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createNewReview, getTopRatedProducts } = require('../controllers/productControllers')

//Get all Products
router.route('/')
.get(getProducts)
.post(protect, admin, createProduct)

//Create review
router.route('/:id/reviews').post(protect, createNewReview)
router.get('/top', getTopRatedProducts)
//Product by id
router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)


module.exports = router