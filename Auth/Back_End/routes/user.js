import express from "express";
import jwt from "jsonwebtoken";
import {
  ForgotPassword,
  Logout,
  ResetPassword,
  SignIn,
  SignUp,
} from "../controller/user.js";
const userRouter = express.Router();

userRouter.route("/signup").post(SignUp);
userRouter.route("/signin").post(SignIn);
userRouter.route("/forgot").post(ForgotPassword);
userRouter.route("/reset/:token").post(ResetPassword);
userRouter.route('/logout').get(Logout)

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      res.json({ status: false, msg: "no token" });
    }
    const verified = jwt.verify(token, process.env.KEY);
    next();
  } catch (err) {
    res.json(err);
  }
};


userRouter.get("/verify", verifyUser, (req, res) => {
  res.json({ status: true, msg: "authorized" });
});

export default userRouter;
