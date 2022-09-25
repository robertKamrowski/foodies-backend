const asyncHandler = require('express-async-handler')

// @desc   Get all plan list from DB
// @route  GET /api/all-plans
// @access Public
const getAllDietPlans = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Get all diet plans there'
  })
})

// @desc   Create a plan in DB
// @route  POST /api/create-plan
// @access Private
const createDietPlan = (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  res.status(200).json({
    message: 'looks good'
  })

}

module.exports = {
  getAllDietPlans,
  createDietPlan
}