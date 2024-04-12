import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnection from "./config/db.js";
import userRouter from "./routes/user.js";

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials:true
}));
dotenv.config({ path: path.join(__dirname, "config", "config.env") });
app.use(cookieParser())
dbConnection();
app.use('/auth',userRouter)


app.listen(5000, () => {
  console.log("server is listening port number " + process.env.PORT);
});
