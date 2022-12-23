const express = require('express')
const router = express.Router()
const { authProtect } = require('../middlewares/authMiddleware')

const DietPlanController = require('../controllers/dietPlanController')

router.get(
   '/diet-plan',
   authProtect,
   DietPlanController.get.bind(DietPlanController)
)
router.post(
   '/diet-plan',
   authProtect,
   DietPlanController.post.bind(DietPlanController)
)

module.exports = router
