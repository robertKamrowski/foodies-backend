const express = require('express')
const router = express.Router()
const {getAllDietPlans, createDietPlan} = require('../controllers/allDietPlansController')

router.get('/', getAllDietPlans)
router.post('/create', createDietPlan)
// /api/create-plan

module.exports = router
