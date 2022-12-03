const User = require('../models/userModel')
const ApiController = require('../lib/ApiController')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController extends ApiController {
   constructor() {
      const apiFields = ['username', 'password']
      super(User, ['_id', ...apiFields], [...apiFields], [], ['password'])
   }

   generateToken(id) {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
         expiresIn: '30d'
      })
   }

   async createUser(req, res) {
      const { username, password, packageCollectAddress } = req.body

      const userExists = await User.findOne({ username })
      if (userExists) {
         res.status(400).json({
            message: 'Istnieje już taki użytkownik',
            data: {}
         })
         return
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const userBodyObject = await super.buildBody(req, res)

      const createdUser = await super.post(req, res, {
         ...userBodyObject,
         password: hashedPassword
      })

      res.status(201).json({
         message: 'Pomyślna rejestracja użytkownika',
         data: createdUser
      })
   }

   async loginUser(req, res) {
      const { username, password } = req.body
      const foundUser = await User.findOne({ username })

      if (!foundUser) {
         res.status(401).json({
            message: 'Brak konta o podanym loginie'
         })
      } else {
         const passwordMatch = await bcrypt.compare(
            password,
            foundUser.password
         )
         if (foundUser && passwordMatch) {
            res.json({
               token: this.generateToken(foundUser._id)
            })
         } else {
            res.status(401).json({
               message: 'Blędne hasło'
            })
         }
      }
   }

   async getMe(req, res) {
      const { id } = req.user
      const user = await User.findById(id, '-__v -password')

      res.status(200).json({
         message: 'Dane użytkownika pobrane pomyślnie',
         user
      })
   }
}

module.exports = new UserController()
