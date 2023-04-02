const express = require('express')
const router = express.Router()
const { authProtect } = require('../middlewares/authMiddleware')
const {
   getProgress,
   postProgress,
   getProgressChart,
   deleteProgress
} = require('../controllers/progressController')

router.post('/progress', authProtect, postProgress)
router.get('/progress', authProtect, getProgress)
router.get('/progress-chart', authProtect, getProgressChart)
router.delete('/progress/:id', authProtect, deleteProgress)

module.exports = router
