const express = require('express')
const router = express.Router()
const { authUser, getUserProfile, registerUser, updateUserProfile } = require('../controllers/userControllers')
const protect = require('../middleware/authMiddleware')

//register user
router.post('/', registerUser)

//Get all Products
router.post('/login', authUser)

//Get profile of user
router.get('/profile', protect, getUserProfile)

//Update user's profile
router.put('/profile', protect, updateUserProfile)

module.exports = router