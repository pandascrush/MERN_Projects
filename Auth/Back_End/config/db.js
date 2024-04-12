import mongoose  from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONOG_URL)
    .then(res=> console.log("Databse Connected"))
    .catch(err => console.log('Database Connection Failed'))
}

export default dbConnection