const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const dietPlanSchema = mongoose.Schema({
   name: String,
   description: String,
   dailyMeals: Number,
   dailyMakro: {
      fat: Number,
      protein: Number,
      carbohydrates: Number
   },
   recipes: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Recipe',
         autopopulate: true
      }
   ]
})

dietPlanSchema.plugin(autopopulate)

module.exports = mongoose.model('DietPlan', dietPlanSchema)
