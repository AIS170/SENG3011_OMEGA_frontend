import React from "react"
import Login from "./login"
import Signup from "./Signup"
import ConfirmSignup from "./Confirm"
import Dashboard from "./Dashboard/Dashboard"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import Home from "./Home"
import Unauthorized from "./Unauthorised"
import ProtectedRoute from "./Protected"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/confirm-signup" element={<ConfirmSignup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/401" element={<Unauthorized/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App