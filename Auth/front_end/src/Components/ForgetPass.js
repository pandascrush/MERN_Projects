import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgetPass() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/auth/forgot", { email })
        .then((res) => {
          console.log(res);
          if (res.data.status) {
            nav("/");
          }
        })
        .catch((err) => console.log("error", e));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="">
      <h1>Forgot Password</h1>
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
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgetPass;
