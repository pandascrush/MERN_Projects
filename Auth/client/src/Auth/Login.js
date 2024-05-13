import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const nav = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    
    axios.defaults.withCredentials = true
    axios.post('http://localhost:8000/auth/login',{Email, Password})
    .then(res=>{
        console.log(res.data);
        if(res.data.msg === "password_incorrect"){
            alert("Check your password")
        }
        else if(res.data.msg === "please_signup"){
            alert("Go to signup")
        }
        else{
            alert("login successfully")
            nav('/home')
        }
    }).catch(err => console.log("error",err))
  }

  return (
    <>
      <h1 className="text-center">Login</h1>
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class=" form-label">
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              style={{ width: "300px" }}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              style={{ width: "300px" }}
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <Link to={'/forgot'} >Forgot Password</Link>
          <br />
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
          <p>
            Don't have an account <Link to={"/sign"}>Click Here</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
