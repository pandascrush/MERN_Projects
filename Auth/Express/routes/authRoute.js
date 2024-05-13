import express from 'express'
import { ForgotPassword, Login, Logout, ResetPassword, Signup, Verify } from '../controller/authController.js'
const authRoute = express.Router()

authRoute.route('/signup').post(Signup)
authRoute.route('/login').post(Login)
authRoute.route('/forget').post(ForgotPassword)
authRoute.route('/reset/:id').post(ResetPassword)
authRoute.route('/auth').get(Verify)
authRoute.route('/logout').get(Logout)

export default authRoute