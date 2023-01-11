const mongoose = require('mongoose')
const recipeSchemaObj = require('../lib/recipeSchemaObj')

const recipeSchema = mongoose.Schema(recipeSchemaObj)

module.exports = mongoose.model('Recipe', recipeSchema)
