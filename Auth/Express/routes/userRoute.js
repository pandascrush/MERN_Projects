import express from 'express'
import { deleteUser, getData, postData, singleData, updateUser } from '../controller/userController.js'
const userroute = express.Router()

userroute.route('/').get(getData)
userroute.route('/add').post(postData)
userroute.route('/:id').get(singleData)
userroute.route('/:id').delete(deleteUser)
userroute.route('/:id').put(updateUser)

export default userroute
