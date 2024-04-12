import userModel from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

//Sign Up
const SignUp = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.json({ msg: "user already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new userModel({
      username,
      password: hashPassword,
      email,
    });

    await newUser.save();
    res.json({ msg: "recrod_registered", user: newUser });
  } catch (err) {
    res.json({ msg: err });
  }
};

// Login
const SignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ msg: "not registered" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      res.json({ msg: "password is incorrect" });
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: "1hr",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 36000 });
    res.json({ status: true, msg: "login success", user: user });
  } catch (e) {
    res.json({ msg: err });
  }
};

//Forgot Password
const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  // console.log(email);

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ msg: "user not exist" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    // console.log(token);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true, // true for 587, false for other ports
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: "sivaranji5670@gmail.com",
        pass: "xkrhimucbawoxlqf",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // console.log(transporter);

    let mailOptions = {
      from: "sivaranji5670@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:3000/reset/${token}`,
    };
    // console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json({ msg: "mail not sent" });
      } else {
        res.json({ status: true, msg: "mail sent" });
      }
    });
  } catch (e) {
    console.log("forgot password error");
  }
};

// Reset Password
const ResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const verified = await jwt.verify(token, process.env.KEY);
    const id = verified.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    res.json({ status: true, msg: "password updated" });
  } catch (err) {
    res.json({ msg: "invalid token" });
  }
};

// Logout
const Logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ status: true, msg: "cleared" });
};

export { SignUp, SignIn, ForgotPassword, ResetPassword, Logout };
