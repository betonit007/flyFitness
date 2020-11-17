const express = require('express')
const router = express.Router()
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } = require('../controllers/orderControllers')
const protect = require('../middleware/authMiddleware')

//new order
router.post('/', protect, addOrderItems)

//get my orders
router.get('/myorders', protect, getMyOrders)

//get order by id
router.get('/:id', protect, getOrderById)

//update to paid
router.put('/:id/pay', protect, updateOrderToPaid)


module.exports = router