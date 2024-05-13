import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

function ResetPassword() {

    const [Password,setPassword] =useState('')
    const {token} =  useParams()

    function handleSubmit(e){
        e.preventDefault()
        
        axios.post(`http://localhost:8000/auth/reset/${token}`,{Password})
        .then(res =>{
            if(res.data.status){
                alert("Success")
            }
        })
    }

  return (
    <>
      <h1 className="text-center">Forgot Password</h1>
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class=" form-label">
              New Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              style={{ width: "300px" }}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <br />
          <button type="submit" class="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
