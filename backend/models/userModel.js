const { Schema, model } = require('mongoose')

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
   }
})

module.exports = model('User', userSchema)
