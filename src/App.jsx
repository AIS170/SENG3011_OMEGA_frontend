import React from "react"
import Login from "./login"
import Signup from "./Signup"
import ConfirmSignup from "./Confirm"
import Dashboard from "./Dashboard/Dashboard"
import Unauthorized from "./Unauthorised"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import Home from "./Home"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/confirm-signup" element={<ConfirmSignup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  )
}

export default App