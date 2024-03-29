const Recipe = require('../models/recipeModel')
const User = require('../models/userModel')
const ApiController = require('../lib/ApiController')

class RecipeController extends ApiController {
   constructor() {
      const apiFields = [
         'title',
         'kcal',
         'isDone',
         'makro',
         'steps',
         'ingredients'
      ]
      super(Recipe, ['_id', ...apiFields], [...apiFields], [], ['__v'])
   }

   async post(req, res) {
      const obj = await super.buildBody(req, res)

      const resp = await super.post(req, res, obj)

      res.status(201).json({
         message: 'Przepis dodany pomyślnie!',
         data: resp
      })
   }

   // Adds a recipe to selected day
   async addToSchedule(req, res) {
      const loggedInUserId = req.user.id
      const { day, recipeId } = req.body

      // Find user
      const user = await User.findById(loggedInUserId)
      const recipe = await Recipe.findById(recipeId)

      // Check if there is already selected recipe in that day
      const recipeExists = user.dietSchedule[day].some((recipe) => {
         return recipe._id.toString() === recipeId
      })
      //
      if (recipeExists) {
         res.status(400).json({
            message: 'Wybrany przepis jest już przypisany do dnia'
         })
         return
      }

      // Add recipe to day schedule and save
      user.dietSchedule[day].push(recipe)
      user.save()

      res.status(200).json({
         message: `Przepis dodany pomyślnie do dnia`
      })
   }

   async removeFromSchedule(req, res) {
      const loggedInUserId = req.user.id
      const { day, recipeId } = req.body

      // Find user
      const user = await User.findById(loggedInUserId)

      // Remove recipe from day schedule and save
      const index = user.dietSchedule[day].findIndex(
         (recipe) => recipe._id.toString() === recipeId
      )
      user.dietSchedule[day].splice(index, 1)
      user.save()

      res.status(200).json({
         message: `Przepis usunięty pomyślnie z dnia`
      })
   }

   async toggleDone(req, res) {
      const loggedInUserId = req.user.id
      const { day, recipeId } = req.body

      const user = await User.findById(loggedInUserId)
      const recipe = user.dietSchedule[day].find(
         (recipe) => recipe._id.toString() === recipeId
      )

      // Message if no recipe is found
      if (!recipe) {
         res.status(400).json({
            message: 'Nie znaleziono przepisu w danym dniu'
         })
         return
      }

      // Toggle recipe boolean value
      recipe.isDone = !recipe.isDone
      user.save()

      res.status(200).json({
         message: `Przepis oznaczony jako ${
            recipe.isDone ? 'zrobiony, tak trzymaj!' : 'niezrobiony'
         }`
      })
   }
}

module.exports = new RecipeController()
