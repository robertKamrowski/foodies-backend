const DietPlan = require('../models/dietPlanModel')
const User = require('../models/userModel')
const ApiController = require('../lib/ApiController')

class DietPlanController extends ApiController {
   constructor() {
      const apiFields = [
         'name',
         'description',
         'dailyMeals',
         'dailyMakro',
         'recipes'
      ]
      super(
         DietPlan,
         ['_id', ...apiFields],
         [...apiFields],
         ['recipes'],
         ['__v']
      )
   }

   async post(req, res) {
      const obj = await super.buildBody(req, res)

      const resp = await super.post(req, res, obj)

      res.status(201).json({
         message: 'Plan dietetyczny dodany pomyślnie!',
         data: resp
      })
   }

   async assignDietPlanToUser(req, res) {
      const loggedInUserId = req.user.id
      const { dietPlanId } = req.body

      const user = await User.findById(loggedInUserId)

      // User already has a plan
      if (user.dietPlan) {
         res.status(400).json({
            message: `Użytkownik ${user.username} ma już przypisany plan dietetyczny. Znajdziesz go w zakładce "Mój plan"`
         })
         return
      }

      // Assign plan to user and save document
      user.dietPlan = dietPlanId
      await user.save()

      res.status(200).json({
         message: `Pomyślnie przypisano plan dietetyczny do użytkonwika ${user.username}. Przejdź na do zakładki "Mój plan" aby wybrać ulubione przepisy z diety!`
      })
   }

   async removeDietPlanFromUser(req, res) {
      const loggedInUserId = req.user.id
      const user = await User.findById(loggedInUserId)

      // User doesn't have a plan
      if (!user.dietPlan) {
         res.status(400).json({
            message: `Użytkownik ${user.username} nie ma przypisanego planu dietetycznego. Znajdziesz go w zakładce "Wszystkie diety"`
         })
         return
      }

      // Remove property from user
      user.dietPlan = null
      await user.save()

      res.status(200).json({
         message: `Pomyślnie wypisano użytkownika ${user.username} z planu dietetycznego`
      })
   }
}

module.exports = new DietPlanController()
