import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import ConfirmSignup from "./Confirm";
import Dashboard from "./Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Home";
import Unauthorized from "./Unauthorised";
import ProtectedRoute from "./Protected";
import Queries from "./Queries";
import StockForecasts from "./StockNews/StockNews";
import StockM from "./Navbar/StockM";
import Profile from "./Profile";
import StockInput from "./Analysis/StockInput";
import StockHistory from "./StockHistory/StockHistory";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ForgotPasswordConf from "./ForgotPassword/ForgotPasswordConf";

const App = () => {
  return (
    <Router>
      <Routes>
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
              <StockInput />
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

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <StockHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/news-feed"
          element={
            <ProtectedRoute>
              <StockForecasts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stocks"
          element={
            <ProtectedRoute>
              <StockM />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/conf-forgot-password" element={<ForgotPasswordConf />} />
      </Routes>
    </Router>
  );
};

export default App;
