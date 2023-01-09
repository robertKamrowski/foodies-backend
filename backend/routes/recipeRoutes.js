const express = require('express')
const router = express.Router()
const { authProtect } = require('../middlewares/authMiddleware')

const RecipeController = require('../controllers/recipeController')

router.get('/recipe', authProtect, RecipeController.get.bind(RecipeController))

router.post(
   '/recipe',
   authProtect,
   RecipeController.post.bind(RecipeController)
)

router.post(
   '/add-to-schedule',
   authProtect,
   RecipeController.addToSchedule.bind(RecipeController)
)

router.post(
   '/remove-from-schedule',
   authProtect,
   RecipeController.removeFromSchedule.bind(RecipeController)
)

router.post(
   '/toggle-recipe-done',
   authProtect,
   RecipeController.toggleDone.bind(RecipeController)
)

module.exports = router
