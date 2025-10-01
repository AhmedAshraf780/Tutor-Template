import { Navigate, useLocation, matchPath } from "react-router-dom";

function ProtectedStudentRoute({ logged, isInGroup, userId, children }) {
  const location = useLocation();

  if (!logged) {
    return <Navigate to="/signin" replace />;
  }

  // check exact match to /students/:userId (no subpath)
  const isAtRootStudent = matchPath(`/students/${userId}`, location.pathname);

  if (isAtRootStudent && isInGroup) {
    return <Navigate to={`/students/${userId}/assignments`} replace />;
  }

  return children;
}
export default ProtectedStudentRoute;
