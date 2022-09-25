const mongoose = require('mongoose')

const allDietPlans = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add text value']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('allDietPlans', allDietPlans)

