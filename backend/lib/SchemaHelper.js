const mongoose = require('mongoose')

const MongooseHelper = (modelName, data = {}) => {
   return mongoose.model(modelName, new mongoose.Schema(data))
}

module.exports = MongooseHelper
