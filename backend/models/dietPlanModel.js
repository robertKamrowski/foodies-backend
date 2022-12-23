const mongoose = require('mongoose')

const dietPlanSchema = mongoose.Schema({
   name: String,
   description: String,
   img: String
})

module.exports = mongoose.model('DietPlan', dietPlanSchema)
