import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/signup/Signup";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/sign-up" element={<Signup />}></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const ProtectedRoute = ({ children }: { children: any }) => {
  const isAuthenticated = localStorage.getItem("accessToken"); 
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AppRoutes;
