import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ForgetPassword from "./Component/ForgetPassword";
import ResetPassword from "./Component/ResetPassword";
import Home from "./Component/Home";
import Read from "./Component/Read";
import Create from "./Component/Create";
import { ContextProvider } from "./Context/Global";
import axios from "axios";
import Update from "./Component/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign" element={<Signup />} />
          <Route path="/forgot" element={<ForgetPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/read" element={<Read />} />
          <Route path="/add" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
