import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5000/app/login", { email, password })
        .then((res) => {
          if (res.data === "existuser") {
            nav("/home", { state: { id: email } });
          } else if (res.data === "notexist") {
            alert("You need to sign up");
          }
        }).catch(err => console.log("error",e))
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "300px" }}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            style={{ width: "300px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>

      <p>or</p>
      <Link to={"/reg"}>SignUp</Link>
    </div>
  );
};

export default Login;
