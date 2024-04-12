import axios from "axios";
import React from "react";
import { Link, useNavigate} from "react-router-dom";

function Home() {
   
  const nav = useNavigate()

  axios.defaults.withCredentials = true
  function handleSubmit(){
    axios.get('http://localhost:5000/auth/logout')
    .then(res => {
      if(res.data.status){
        nav('/')
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <h1>Home</h1>
        <Link to={'/dashboard'}>Dashboard</Link>
        <button onClick={handleSubmit}>Logout</button>
    </div>
  );
}

export default Home;
