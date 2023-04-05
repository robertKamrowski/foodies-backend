const express = require('express')
const router = express.Router()
const { authProtect } = require('../middlewares/authMiddleware')
const {
   getProgress,
   postProgress,
   getSingleProgress,
   getProgressChart,
   updateProgress,
   deleteProgress
} = require('../controllers/progressController')

router.post('/progress', authProtect, postProgress)
router.get('/progress', authProtect, getProgress)
router.get('/progress-chart', authProtect, getProgressChart)
router.get('/progress/:id', authProtect, getSingleProgress)
router.patch('/progress/:id', authProtect, updateProgress)
router.delete('/progress/:id', authProtect, deleteProgress)

module.exports = router
