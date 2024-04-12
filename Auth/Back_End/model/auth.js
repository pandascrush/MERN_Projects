import mongoose from 'mongoose'

let loginScheme = mongoose.Schema({
    email:{
        type:String,
        required : true
    },
    password:{
        type : String,
        required: true
    }
})

const loginModel = mongoose.model('login',loginScheme)

export default loginModel