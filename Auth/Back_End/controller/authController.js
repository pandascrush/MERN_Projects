import express from "express";
import loginModel from "../model/auth.js";

const SignUp = async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const user = await loginModel.findOne({ email });
    if (user) {
      res.json("existuser");
    } else {
      res.json("notexist");
      await loginModel.insertMany([data]);
    }
  } catch (e) {
    res.json("error", e);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginModel.findOne({ email });
    if (user) {
      res.json("existuser");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("error", e);
  }
};

export { SignUp, Login };
