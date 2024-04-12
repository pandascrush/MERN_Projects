import express from 'express'
import { Login, SignUp } from '../controller/authController.js'
const auth_routing = express.Router()

auth_routing.route('/signup').post(SignUp)
auth_routing.route('/login').post(Login)

export default auth_routing
