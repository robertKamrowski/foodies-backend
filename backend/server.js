const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const colors = require('colors')

const {errorHandler} = require('./middlewares/errorMiddleware')
const {connectDB} = require('./config/db')

connectDB()

const port = process.env.PORT || 5000
const app = express()

// Global middlewares

// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use('/api/auth', require('./routes/userRoutes'))
app.use('/api/plans', require('./routes/allDietPlansRoutes'))

// Response middlewares
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port: ${port}`.cyan))