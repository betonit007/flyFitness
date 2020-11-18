const express = require('express')
const router = express.Router()
const { authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers, deleteUser, getUserById, updateUser } = require('../controllers/userControllers')
const { protect, admin } = require('../middleware/authMiddleware')

//register user
router.post('/', registerUser)

//Get all Products
router.post('/login', authUser)

//Get profile of user
router.get('/profile', protect, getUserProfile)

//get all users as admin
router.get('/', protect, admin, getAllUsers)

//get user by id ADMIN ONLY
router.get('/:id', protect, admin, getUserById)

//update user ADMIN ONLY
router.put('/:id', protect, admin, updateUser)

//Update user's profile
router.put('/profile', protect, updateUserProfile)

//delete user
router.delete('/:id', protect, admin, deleteUser)

module.exports = router