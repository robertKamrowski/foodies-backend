const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { chartTransform } = require('../lib/chartTransform')

/*
   @desc    Push a progress data object into user progress array
   @route   POST /api/progress
   @access  Private
*/
const postProgress = asyncHandler(async (req, res) => {
   const { date, weight } = req.body

   // Body validation
   if (!date || !weight) {
      res.status(400)
      throw new Error('Proszę podać wartości dla pól: date i weight')
   }

   // Get loggedIn user
   const userId = req.user.id
   const loggedInUser = await User.findById(userId)
   if (!loggedInUser) {
      res.status(400)
      throw new Error('Nie znaleziono użytkownika')
   }

   // Validate if the same progress record already exists
   // There should be only one progress item for one day
   const ifProgressItemExists = loggedInUser.progress.find(
      (item) => item.date === date
   )
   if (ifProgressItemExists) {
      res.status(400)
      throw new Error(
         `Zapis postępu z dnia ${date} znajduje się już na wykresie`
      )
   }

   // Push progressItem into progress array
   loggedInUser.progress.push(req.body)
   loggedInUser.save()
   res.status(201).json({
      data: {
         date,
         weight: +weight
      },
      message: 'Tak trzymaj, monitoruj swoje postępy każdego dnia!'
   })
})

/*
   @desc    Get a single progress record from loggedIn user
   @route   GET /api/progress/:id
   @access  Private
*/
const getSingleProgress = asyncHandler(async (req, res) => {
   // Get loggedIn user
   const userId = req.user.id
   const loggedInUser = await User.findById(userId)
   if (!loggedInUser) {
      res.status(400)
      throw new Error('Nie znaleziono użytkownika')
   }

   const { id } = req.params
   const progress = loggedInUser.progress.find(
      (progress) => progress._id.toString() === id
   )

   if (!progress) {
      res.status(400)
      throw new Error('Nie znaleziono postępu')
   }

   res.status(200).json({
      message: 'Postęp znaleziony pomyślnie!',
      data: progress
   })
})

/*
   @desc    Get a progress data from loggedIn user
   @route   GET /api/progress
   @access  Private
*/
const getProgress = asyncHandler(async (req, res) => {
   // Get loggedIn user
   const userId = req.user.id
   const loggedInUser = await User.findById(userId)
   if (!loggedInUser) {
      res.status(400)
      throw new Error('Nie znaleziono użytkownika')
   }

   res.status(200).json({
      data: loggedInUser.progress,
      message: 'Postępy pobrane pomyślnie!'
   })
})

/*
   @desc    Get a progress data from loggedIn user
   @route   GET /api/progress-chart
   @access  Private
*/
const getProgressChart = asyncHandler(async (req, res) => {
   // Get loggedIn user
   const userId = req.user.id
   const loggedInUser = await User.findById(userId)
   if (!loggedInUser) {
      res.status(400)
      throw new Error('Nie znaleziono użytkownika')
   }

   // Transform progress data to be friendly for a chart
   res.status(200).json({
      data: chartTransform(loggedInUser.progress),
      message: 'Dane do wykresu pobrano pomyślnie'
   })
})

/*
   @desc    Update a progress record from loggedIn user
   @route   PATCH /api/progress/:id
   @access  Private
*/
const updateProgress = asyncHandler(async (req, res) => {
   // Get loggedIn user
   const userId = req.user.id
   const loggedInUser = await User.findById(userId)
   if (!loggedInUser) {
      res.status(400)
      throw new Error('Nie znaleziono użytkownika')
   }

   const { id } = req.params

   const progressIndex = loggedInUser.progress.findIndex(
      (progress) => progress._id.toString() === id
   )

   // No progress
   if (progressIndex === -1) {
      res.status(400)
      throw new Error('Nie znaleziono postępu do zaktualizowania')
   }

   // Update user progress
   loggedInUser.progress[progressIndex] = {
      ...loggedInUser.progress[progressIndex],
      ...req.body
   }
   loggedInUser.save()

   res.status(200).json({
      message: 'Postęp zaktualizowany pomyślnie!',
      data: req.body
   })
})

/*
   @desc    Delete a progress record from loggedIn user
   @route   DELETE /api/progress/:id
   @access  Private
*/
const deleteProgress = asyncHandler(async (req, res) => {
   // Get loggedIn user
   const userId = req.user.id
   const loggedInUser = await User.findById(userId)
   if (!loggedInUser) {
      res.status(400)
      throw new Error('Nie znaleziono użytkownika')
   }

   const { id } = req.params
   const progressToRemove = loggedInUser.progress.find(
      (progress) => progress._id.toString() === id
   )

   if (!progressToRemove) {
      res.status(400)
      throw new Error('Nie znaleziono postępu do usunięcia')
   }

   loggedInUser.progress = loggedInUser.progress.filter(
      (progress) => progress._id.toString() !== id
   )
   loggedInUser.save()

   res.status(200).json({
      message: 'Postęp usunięty pomyślnie!'
   })
})

module.exports = {
   postProgress,
   getSingleProgress,
   getProgress,
   getProgressChart,
   updateProgress,
   deleteProgress
}
