
import React from "react";
import Login from "./login";
import Signup from "./Signup";
import ConfirmSignup from "./Confirm";
import Dashboard from "./Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Home";
import Unauthorized from "./Unauthorised";
import ProtectedRoute from "./Protected";
import Analysis from "./Analysis";
import Queries from "./Queries";

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Signup/>} />
        <Route path="/confirm-signup" element={<ConfirmSignup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirm-signup" element={<ConfirmSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/401" element={<Unauthorized />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-help"
          element={
            <ProtectedRoute>
              <Queries />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
