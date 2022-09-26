const express = require('express')
const router = express.Router()

const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {authProtect} = require('../middlewares/authMiddleware')

// Endpoint routes `/api/auth`
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authProtect, getMe)

module.exports = router

