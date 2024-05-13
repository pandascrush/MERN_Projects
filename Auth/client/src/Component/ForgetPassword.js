import React, { useState } from 'react'
import axios from 'axios'

function ForgetPassword() {
    const [Email,setEmail] = useState('')

    function handleSubmit(e){
        e.preventDefault()

        axios.post('http://localhost:8000/auth/forget',{Email})
        .then(res =>{
            if(res.data.status){
                alert("Check You're eamil for resetpasword link")
            }
            else{
                alert("user not exist, Please go to signup")
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
          </div>
          <br />
          <button type="submit" class="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </>
  )
}

export default ForgetPassword