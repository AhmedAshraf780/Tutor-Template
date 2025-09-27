import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ logged, isAdmin, children }) {
  const location = useLocation();
  if (!logged) {
    return <Navigate to="/signin" replace />;
  }
  if (isAdmin && location.pathname.startsWith("/students")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
