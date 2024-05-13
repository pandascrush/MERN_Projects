import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [City, setCity] = useState("");

  const nav = useNavigate()

  function handleSubmit(e){
    e.preventDefault()

    axios.post('http://localhost:8000/user/add',{Name,Email,Contact,City})
    .then(res =>{
        console.log(res.data.msg);
        if(res.data.msg === "added"){
            alert("Data Added")
            nav('/read')
        }
    })
  }

  return (
    <>
      <h1 className="text-center">New User Form</h1>
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class=" form-label">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              style={{ width: "300px" }}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
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
              required
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class=" form-label">
              Mobile
            </label>
            <input
              onChange={(e) => setContact(e.target.value)}
              type="number"
              style={{ width: "300px" }}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              City
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              type="password"
              style={{ width: "300px" }}
              class="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Create;
