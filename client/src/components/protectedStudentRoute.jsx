import { Navigate, useLocation } from "react-router-dom";

function ProtectedStudentRoute({ logged, isInGroup, userId, children }) {
  const location = useLocation();
  if (!logged) {
    return <Navigate to="/signin" replace />;
  }
  if (location.pathname.startsWith("/students")) {
    if (!isInGroup) return <Navigate to={`/students/${userId}`} replace />;
  }

  return children;
}

export default ProtectedStudentRoute;
