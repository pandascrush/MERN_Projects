import mongoose  from "mongoose";

function dbConnection(){
    mongoose.connect(process.env.atlas)
    .then(res => console.log("Database Connected"))
    .catch(err => console.log("Databse it's not connected",err))
}

export default dbConnection