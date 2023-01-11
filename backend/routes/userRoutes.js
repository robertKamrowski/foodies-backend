const express = require('express')
const router = express.Router()
const { authProtect } = require('../middlewares/authMiddleware')

const userController = require('../controllers/userController')

// Endpoint routes `/api/auth`
router.post('/register', userController.createUser.bind(userController))
router.post('/login', userController.loginUser.bind(userController))
router.get('/me', authProtect, userController.getMe.bind(userController))
router.get('/users', authProtect, userController.get.bind(userController))

module.exports = router
