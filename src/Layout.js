import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./pages/Main"; // Assuming Main is your protected page

function Layout() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Layout;
