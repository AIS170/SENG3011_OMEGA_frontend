import React from "react"
import Login from "./login"
import LandingPage from "./LandingPage/LandingPage"
import Signup from "./Signup"
import ConfirmSignup from "./Confirm"
import { BrowserRouter as Router, Routes, Route } from "react-router"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/confirm-signup" element={<ConfirmSignup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
