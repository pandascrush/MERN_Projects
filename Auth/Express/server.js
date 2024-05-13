import express from 'express'
import cors from 'cors'
import userroute from './routes/userRoute.js'
import dbConnection from './config/Db.js'
import authRoute from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
import { Verification } from './middleware/Verification.js'
import dotenenv from 'dotenv'
import path from 'path'

const  __dirname = path.resolve() 
dotenenv.config({path:path.join(__dirname,'config','config.env')})

const app = express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(cookieParser())
 
app.use("/user",userroute)                  // http://localhost:8000/user/
app.use("/auth",authRoute)                  // http://localhost:8000/auth/
app.use('/verify',Verification,authRoute)   // http://localhost:8000/verify/auth


dbConnection()





app.listen(process.env.PORT,()=>{
    console.log("Server is listening on port no " + process.env.PORT)
})














// common js ---> // const express = require('express')
// const app = express()

/* ES Module Type Import */

// get(path,callback)
// post(path,callback)
// put(path,callback)
// delete(path,callback)
// use()                    --> Handling middlewares
// send()                   --> sending messages
// status()                 --> passing stats codes
// json()                   --> passing json data's
// listen(port, callback)   --> port mention

// import express from 'express'
// const server = express()
// import Customer from './Customer.js'

// // All Customer Data
// server.get('/',(req,res)=>{
//     req.params
//     res.status(200)
//     res.json(Customer)
// })

// // Specfic Customer Data's
// server.get('/app',(req,res)=>{
//     const filtered = Customer.map(e=>{
//         const {Name,City} = e
//         return {Name,City}
//     })
//     res.json(filtered)
// })

// // Id Based Response
// server.get('/app/:id',(req,res)=>{
//     const {id} = req.params

//     const filtered = Customer.find(cus=>{
//         const finded = cus.id == id
//         return finded
//     })
//     res.json(filtered)
// })

// // Print 1st value
// // server.get('/app/1',(req,res)=>{
// //     const filtered = Customer.find(cus=>{
// //         const finded = cus.id == 1
// //         return finded
// //     })
// //     res.json(filtered)
// // })

// // constantly show the 1st value
// server.get('/app/:id',(req,res)=>{
//     res.json(Customer[0])
// })

// // Server Listen Port
// server.listen(8000,()=>{
//     console.log('sever listening on port no 8000..');
// })

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// const app = express();

// // Adding Response Header allow the origin
// app.use(cors()) 

// // allow to access json data's
// app.use(express.json()); 


// mongoose
//   .connect("mongodb://localhost:27017/NewDB")
//   .then((res) => console.log("DB Connected"))
//   .catch((err) => console.log("error", err));

// const userShema = mongoose.Schema({
//   Name: String,
//   Age: Number,
//   Des: String,
//   City: String,
// });

// const userModel = mongoose.model("user", userShema);

// // cors --> cross origin resource sharing

// app.post("/add", async (req, res) => {
//   const { Name, Age, City, Des } = req.body;

//   try {
//     const newUser = await userModel.create({ Name, Age, City, Des });
//     res.json({ msg: "added" });
//   }
//   catch (err) {
//     res.json({ msg: "error" });
//   }
// });

// app.get("/userData", async (req, res) => {
//     try{
//     const userData = await userModel.find({})
//     res.json({userData})
//     }
//     catch(err){
//         res.json({msg:"error"})
//     }
// });

// app.listen(7000, () => {
//   console.log("server listening on port no 8000...");
// });

//                             MVC Pattern

// model         --> database shema and model creation
// controller    --> Business Logic
// routes        --> handling api, http methods
// config        --> db connection, env variable
// index.js      --> Root File

