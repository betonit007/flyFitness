const asyncHandler = require('express-async-handler')
const { findOne } = require('../models/userModel')
const generateToken = require('../utils/generateToken')
const User = require('../models/userModel')

//auth user and get token
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or password')
    }
})

//register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }
})


const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save() 

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

//get users - ADMIN priveleges only
const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})

    if (users) {

        res.json(users)

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

//delete user - ADMIN priveleges only
const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if (user) {

       await user.remove()
       res.json({ message: 'User removed'})

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

//get user by id - ADMIN priveleges only
const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select("-password")

    if (user) {

       res.json(user)

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

//update user by id
const updateUser = asyncHandler(async (req, res) => {
    console.log('update hit')

    const user = await User.findById(req.params.id)
    console.log(req.body.isAdmin);
    
    if (user) {

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(!req.body.isAdmin == undefined) {
            user.isAdmin = user.isAdmin
        }
        else if (req.body.isAdmin === false) {
            user.isAdmin = false
        } else if (req.body.isAdmin === true) {
            user.isAdmin = true
        }

        const updatedUser = await user.save() 

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else {
        res.status(404)
        throw new Error('User not found / Problem updating user')
    }
})

module.exports = {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    getUserById,
    updateUser
}