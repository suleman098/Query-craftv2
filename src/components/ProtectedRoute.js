import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, [auth]);

  if (isAuthenticated === null) {
    return null; // Show nothing or a loading spinner while waiting for auth check
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
