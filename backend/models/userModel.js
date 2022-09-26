const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username']
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
