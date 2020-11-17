const express = require('express')
const router = express.Router()
const {addOrderItems, getOrderById } = require('../controllers/orderControllers')
const protect = require('../middleware/authMiddleware')

//register user
router.post('/', protect, addOrderItems)

router.get('/:id', protect, getOrderById)


module.exports = router