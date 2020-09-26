const mongoose = require('mongoose')

const userScheme = mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  name: {
    type: String,
    required: true,
    min: 2,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', userScheme)
