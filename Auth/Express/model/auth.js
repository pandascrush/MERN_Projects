import mongoose from "mongoose";

const authShema =  mongoose.Schema({
    Name: String,
    Email : String,
    Mobile : Number,
    Password : String
})

const authModel = mongoose.model('authentication',authShema)

export default authModel