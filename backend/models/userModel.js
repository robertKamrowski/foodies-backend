const { Schema, model } = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

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
      monday: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            autopopulate: true
         }
      ],
      tuesday: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            autopopulate: true
         }
      ],
      wednesday: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            autopopulate: true
         }
      ],
      thursday: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            autopopulate: true
         }
      ],
      friday: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            autopopulate: true
         }
      ],
      saturday: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            autopopulate: true
         }
      ],
      sunday: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            autopopulate: true
         }
      ]
   }
})
userSchema.plugin(autopopulate)

module.exports = model('User', userSchema)
