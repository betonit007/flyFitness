const express = require('express')
const router = express.Router()
const { authUser, getUserProfile, registerUser } = require('../controllers/userControllers')
const protect = require('../middleware/authMiddleware')

//register user
router.post('/', registerUser)

//Get all Products
router.post('/login', authUser)

//Get profile of user
router.get('/profile', protect, getUserProfile)

module.exports = router