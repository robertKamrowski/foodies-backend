const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user in DB
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {username, password, role} = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists in DB
  const userExists = await User.findOne({username})
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password with salt
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create a user in DB
  const createdUser = await User.create({
    username,
    role,
    password: hashedPassword
  })

  // Return createdUser data if success
  if (createdUser) {
    res.status(200).json({
      id: createdUser.id,
      username: createdUser.username,
      role: createdUser.role,
      token: generateToken(createdUser.id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a use
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const {username, password} = req.body

  // Check for user in DB based on username
  const foundUser = await User.findOne({username})
  if (!foundUser) {
    res.status(401)
    throw new Error('Invalid login')
  } else {
    // Check if password match to found user
    const passwordMatch = await bcrypt.compare(password, foundUser.password)

    if (foundUser && passwordMatch) {
      res.json({
        token: generateToken(foundUser._id)
      })
    } else {
      res.status(401)
      throw new Error('Invalid password')
    }
  }
})

// @desc    Get loggedIn user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  const {id, username, role} = await User.findById(req.user.id)

  res.status(200).json({
    id,
    username,
    role
  })
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe
}
