const Recipe = require('../models/recipieModel')
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
}

module.exports = new RecipeController()
