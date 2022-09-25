const asyncHandler = require('express-async-handler')
const allDietPlans = require('../models/dietPlanModel')

// @desc   Get all plan list from DB
// @route  GET /api/all-plans
// @access Public
const getAllDietPlans = asyncHandler(async (req, res) => {

  const dietPlan = await allDietPlans.find()

  res.status(200).json(dietPlan)
})

// @desc   Create a plan in DB
// @route  POST /api/create-plan
// @access Private
const createDietPlan = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const text = await allDietPlans.create({
    text: req.body.text
  })

  res.status(200).json({
    message: 'looks good',
    text
  })

})

module.exports = {
  getAllDietPlans,
  createDietPlan
}