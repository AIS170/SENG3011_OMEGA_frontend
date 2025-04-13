import React from "react"
import Login from "./login"
import Signup from "./Signup"
import ConfirmSignup from "./Confirm"
import Dashboard from "./Dashboard/Dashboard"
import { BrowserRouter as Router, Routes, Route } from "react-router"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/confirm-signup" element={<ConfirmSignup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}

export default App