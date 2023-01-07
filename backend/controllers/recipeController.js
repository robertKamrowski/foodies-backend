const Recipe = require('../models/recipieModel')
const User = require('../models/userModel')
const ApiController = require('../lib/ApiController')

class RecipeController extends ApiController {
   constructor() {
      const apiFields = ['title', 'kcal', 'makro', 'steps', 'ingredients']
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

   async addToSchedule(req, res) {
      const loggedInUserId = req.user.id
      const { day, recipeId } = req.body

      // Find user
      const user = await User.findById(loggedInUserId)

      // Check if there is already selected recipe in that day
      const recipeExists = user.dietSchedule[day].some((recipe) => {
         return recipe._id.toString() === recipeId
      })

      if (recipeExists) {
         res.status(400).json({
            message: 'Wybrany przepis jest już przypisany do dnia'
         })
         return
      }

      // Add recipe to day schedule and save
      user.dietSchedule[day].push(recipeId)
      user.save()
      res.status(200).json({
         message: `Przepis dodany pomyślnie do dnia`
      })
   }
}

module.exports = new RecipeController()
