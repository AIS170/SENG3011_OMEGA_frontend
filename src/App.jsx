import React from "react"
import Login from "./login"
import Signup from "./Signup"
import ConfirmSignup from "./Confirm"
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
      </Routes>
    </Router>
  )
}

export default App