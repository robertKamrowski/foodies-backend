const DietPlan = require('../models/dietPlanModel')
const ApiController = require('../lib/ApiController')

class DietPlanController extends ApiController {
   constructor() {
      const apiFields = ['name', 'description', 'img']
      super(DietPlan, ['_id', ...apiFields], [...apiFields], [], ['__v'])
   }

   async post(req, res) {
      const obj = await super.buildBody(req, res)

      const resp = await super.post(req, res, obj)

      res.status(201).json({
         message: 'Plan dietetyczny dodany pomyślnie!',
         data: resp
      })
   }
}

module.exports = new DietPlanController()
