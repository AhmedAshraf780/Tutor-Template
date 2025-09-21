import { useState, useEffect, useLayoutEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import Navbar from "./components/navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import Signup from "./pages/signup/page.jsx";
import Signin from "./pages/signin/page.jsx";
import OtpVerify from "./pages/signup/otp.jsx";
import VerifyEmail from "./pages/signin/forgetpassword/verifyEmail.jsx";
import ResetPassword from "./pages/signin/forgetpassword/changepassword.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import StudentPage from "./pages/students/page.jsx";
import NotesPage from "./pages/students/notes.jsx";
import AssignmentsPage from "./pages/students/assignments.jsx";
import { authService } from "./services/auth.js";
import Userpane from "./pages/admin/userspane";
import GroupPane from "./pages/admin/grouppane";
import { ToastProvider } from "./components/ui/toast";
import Assignmentspane from "./pages/admin/assignmentspane";
import LabPane from "./pages/admin/labPane";
import AssignementCard from "./pages/admin/assignementCard";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const navRoutes = ["/", "/signin", "/signup", "/auth/verifyotp"];
  const showNav = navRoutes.includes(location.pathname);

  const [logged, setLogged] = useState(null); // null = loading
  const [userData, setUserData] = useState(null);

  useLayoutEffect(() => {
    (async () => {
      const res = await authService.isLogged();
      if (res.success) {
        setUserData(res.user);
        setLogged(true);
        // Navigate based on user role after auth check
        if (res.user?.isAdmin && navRoutes.includes(location.pathname)) {
          navigate("/dashboard/mygroups", { replace: true });
        } else if (
          !res.user?.isAdmin &&
          navRoutes.includes(location.pathname)
        ) {
          navigate(`/students/${userData.id}`, { replace: true });
        }
      } else {
        setLogged(false);
      }
    })();
  }, [navigate]);

  // Show loading state while checking auth
  if (logged === null) return <div>Loading...</div>;

  return (
    <ToastProvider>
      {showNav && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/auth/verifyotp" element={<OtpVerify />} />
        <Route path="/auth/forgotpassword" element={<VerifyEmail />} />
        <Route
          path="/auth/restorepassword/:sessionId"
          element={<ResetPassword />}
        />
        {/* Protected routes */}
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute logged={logged} isAdmin={userData?.isAdmin}>
              <Userpane />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/mygroups"
          element={
            <ProtectedRoute logged={logged} isAdmin={userData?.isAdmin}>
              <GroupPane />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/assignments"
          element={
            <ProtectedRoute logged={logged} isAdmin={userData?.isAdmin}>
              <Assignmentspane />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/assignmentpage"
          element={
            <ProtectedRoute logged={logged} isAdmin={userData?.isAdmin}>
              <AssignementCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/lab"
          element={
            <ProtectedRoute logged={logged} isAdmin={userData?.isAdmin}>
              <LabPane />
            </ProtectedRoute>
          }
        />
        {/* Student Routes */}
        {/* {logged && <Route path="/students" element={<StudentPage />} />} */}
        {logged && <Route path="/students/:id/notes" element={<NotesPage />} />}
        {logged && (
          <Route
            path="/students/:id/assignments"
            element={<AssignmentsPage />}
          />
        )}
        {logged && <Route path="/students/:id" element={<StudentPage />} />}
        {/* Not found */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
