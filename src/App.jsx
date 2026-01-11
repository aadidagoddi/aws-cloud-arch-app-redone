import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AWSLinking from "./components/Auth/AWSLinking";
import Dashboard from "./components/Dashboard/Dashboard";
import Workspace from "./components/ProjectWorkspace/Workspace";

function ProtectedRoute({ children }) {
  const { isAuthenticated, hasAWSLinked } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAWSLinked) {
    return <Navigate to="/aws-linking" replace />;
  }

  return children;
}

function App() {
  const { isAuthenticated, hasAWSLinked } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate
                to={hasAWSLinked ? "/dashboard" : "/aws-linking"}
                replace
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate
                to={hasAWSLinked ? "/dashboard" : "/aws-linking"}
                replace
              />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/aws-linking"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : hasAWSLinked ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AWSLinking />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/:projectId"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
