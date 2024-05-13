import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

function Read() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/user/").then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  }, []);

  const handleDelete = (a) => {
    axios.delete(`http://localhost:8000/user/${a}`)
    .then(res =>{
        if(res.data.status){
            alert("Deleted")
        }
    })
  }

  return (
    <>
    <Nav/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">City</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
            {user.map((e) => {
              return (
                <tr>
                  <td>{e.Name}</td>
                  <td>{e.Email}</td>
                  <td>{e.Contact}</td>
                  <td>{e.City}</td>
                  <td><button className="btn btn-danger" onClick={()=>handleDelete(e._id)} >Delete</button></td>
                  <td><Link className="btn btn-success" to={`/update/${e._id}`} >Update</Link></td>
                  </tr>
              );
            })}
          
        </tbody>
      </table>
    </>
  );
}

export default Read;
