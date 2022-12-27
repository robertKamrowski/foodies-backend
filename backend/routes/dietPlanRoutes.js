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
router.post(
   '/assign-diet-plan',
   authProtect,
   DietPlanController.assignDietPlanToUser.bind(DietPlanController)
)
router.delete(
   '/remove-diet-plan',
   authProtect,
   DietPlanController.removeDietPlanFromUser.bind(DietPlanController)
)
module.exports = router
