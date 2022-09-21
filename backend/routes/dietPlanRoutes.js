const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Get goals'
  })
})

router.post('/', (req, res) => {
  res.status(200).json({
    message: 'Post goals'
  })
})

router.patch('/:id', (req, res) => {
  res.status(200).json({
    message: `Update diet ${req.params.id}`
  })
})

router.delete('/:id', (req, res) => {
  res.status(200).json({
    message: `Delete diet ${req.params.id}`
  })
})

module.exports = router
