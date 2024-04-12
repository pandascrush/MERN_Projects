import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignIn from "./Auth1.js/SignIn";
import SignUp from "./Auth1.js/SignUp";
import ForgetPass from "./Components/ForgetPass";
import Resetpass from "./Components/Resetpass";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/home" Component={Home} />
          <Route path="/forgot" Component={ForgetPass} />
          <Route path="/reset/:token" Component={Resetpass} />
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
