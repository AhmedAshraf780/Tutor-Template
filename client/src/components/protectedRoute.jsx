import { Navigate } from "react-router-dom";

function ProtectedRoute({ logged, children }) {
  if (!logged) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export default ProtectedRoute;
