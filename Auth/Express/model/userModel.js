import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    Name:String,
    Email:String,
    Contact:Number,
    City:String
})

const userModel = mongoose.model('user_data',userSchema)

export default userModel