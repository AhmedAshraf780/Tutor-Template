import { Navigate } from "react-router-dom";

function ProtectedRoute({ logged, isAdmin, children }) {
  if (!logged) {
    return <Navigate to="/signin" replace />;
  }
  if (isAdmin && location.href.startsWith("/students")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
