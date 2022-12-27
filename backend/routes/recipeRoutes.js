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

module.exports = router