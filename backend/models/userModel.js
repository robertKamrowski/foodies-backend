const { Schema, model } = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const recipeSchemaObj = require('../lib/recipeSchemaObj')
const progressSchemaObj = require('../lib/progressSchemaObj')

const userSchema = Schema({
   username: {
      type: String,
      required: [true, 'Please add a username']
   },
   password: {
      type: String,
      required: [true, 'Please add a password']
   },
   dietPlan: {
      type: Schema.Types.ObjectId,
      ref: 'DietPlan'
   },
   dietSchedule: {
      monday: [recipeSchemaObj],
      tuesday: [recipeSchemaObj],
      wednesday: [recipeSchemaObj],
      thursday: [recipeSchemaObj],
      friday: [recipeSchemaObj],
      saturday: [recipeSchemaObj],
      sunday: [recipeSchemaObj]
   },
   progress: [progressSchemaObj]
})
userSchema.plugin(autopopulate)

module.exports = model('User', userSchema)
