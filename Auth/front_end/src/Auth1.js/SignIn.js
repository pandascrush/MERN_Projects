import Axios  from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const SignIn = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  Axios.defaults.withCredentials = true
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await Axios
        .post("http://localhost:5000/auth/signin", { email, password })
        .then((res) => {
          console.log(res);
          if(res.data.status){
            nav('/home')
          }
        })
        .catch((err) => console.log("error", e));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
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
      <div>
        <Link to={'/forgot'}> Forgot Password</Link>
      </div>

      <p>Create an account <Link to={"/signup"}>SignUp</Link></p>
    </div>
  );
};

export default SignIn;
