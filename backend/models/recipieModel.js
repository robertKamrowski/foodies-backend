const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
   title: String,
   kcal: Number,
   isDone: {
      type: Boolean,
      default: false
   },
   makro: {
      fat: Number,
      protein: Number,
      carbohydrates: Number
   },
   steps: Array,
   ingredients: Array
})

module.exports = mongoose.model('Recipe', recipeSchema)
