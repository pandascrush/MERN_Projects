import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextUser } from "../Context/Global";
import axios from "axios";

function Nav() {
  const nav = useNavigate();

  function handleLogout() {
    axios.get("http://localhost:8000/auth/logout").then((res) => {
      if (res.data.status) {
        nav("/");
      }
    });
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link class="navbar-brand" to={''}>
        Navbar
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link class="nav-link active" to={'/add'}>
              Add New User
            </Link>
          </li>
          <li class="nav-item">
            <button class="nav-link active" onClick={()=> handleLogout()}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
