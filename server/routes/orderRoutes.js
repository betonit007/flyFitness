const express = require('express')
const router = express.Router()
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } = require('../controllers/orderControllers')
const { protect, admin } = require('../middleware/authMiddleware')

//new order
router.post('/', protect, addOrderItems)

//get my orders
router.get('/myorders', protect, getMyOrders)

//Admin route to get all orders
router.get('/', protect, admin, getOrders)

//get order by id
router.get('/:id', protect, getOrderById)

//update to paid
router.put('/:id/pay', protect, updateOrderToPaid)

//update order to show its been shipped
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)




module.exports = router