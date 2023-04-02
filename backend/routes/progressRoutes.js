const express = require('express')
const router = express.Router()
const { authProtect } = require('../middlewares/authMiddleware')
const {
   getProgress,
   postProgress,
   deleteProgress
} = require('../controllers/progressController')

router.post('/progress', authProtect, postProgress)
router.get('/progress', authProtect, getProgress)
router.delete('/progress/:id', authProtect, deleteProgress)

module.exports = router
