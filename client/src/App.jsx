import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import Navbar from "./components/navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import Signup from "./pages/signup/page.jsx";
import Signin from "./pages/signin/page.jsx";
import OtpVerify from "./pages/signup/otp.jsx";
import VerifyEmail from "./pages/signin/forgetpassword/verifyEmail.jsx";
import ResetPassword from "./pages/signin/forgetpassword/changepassword.jsx";
import StudentPage from "./pages/students/page.jsx";
import NotesPage from "./pages/students/notes.jsx";
import AssignmentsPage from "./pages/students/assignments.jsx";
import Userpane from "./pages/admin/userspane";
import GroupPane from "./pages/admin/grouppane";
import { ToastProvider } from "./components/ui/toast";
import Assignmentspane from "./pages/admin/assignmentspane";
import LabPane from "./pages/admin/labPane";
import AssignementCard from "./pages/admin/assignementCard";
import ProtectedStudentRoute from "./components/protectedStudentRoute";
import NotFoundPage from "./components/notFound";
import { useWhoAmI } from "./hooks/whoAmI";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const navRoutes = ["/", "/signin", "/signup", "/auth/verifyotp"];
  const showNav = navRoutes.includes(location.pathname);

  const { data: userData, isLoading, isError } = useWhoAmI();

  // Determine if the user is logged in
  const logged = userData?.logged; // true if userData exists, false if null

  // Redirect based on user role and auth status
  useEffect(() => {
    console.log("userData",userData);
    console.log("logged",logged);
    if (isLoading) return; // wait for query to finish

    if (logged && navRoutes.includes(location.pathname)) {
      if (userData?.user?.isAdmin) {
        navigate("/dashboard/mygroups", { replace: true });
      } else {
        navigate(`/students/${userData?.user?.id}`, { replace: true });
      }
    }
  }, [logged, userData, location.pathname, navigate, isLoading]);

  // Loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Optional: handle error state
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error fetching user data
      </div>
    );
  }

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

        {/* Admin Protected routes */}
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute logged={logged} isAdmin={userData?.user?.isAdmin}>
              <Userpane />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/mygroups"
          element={
            <ProtectedRoute logged={logged} isAdmin={userData?.user?.isAdmin}>
              <GroupPane />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/assignments"
          element={
            <ProtectedRoute logged={logged} isAdmin={userData?.user?.isAdmin}>
              <Assignmentspane />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/assignmentpage"
          element={
            <ProtectedRoute logged={logged} isAdmin={userData?.user?.isAdmin}>
              <AssignementCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/lab"
          element={
            <ProtectedRoute logged={logged} isAdmin={userData?.user?.isAdmin}>
              <LabPane />
            </ProtectedRoute>
          }
        />

        {/* Student Protected routes */}
        <Route
          path="/students/:id"
          element={
            <ProtectedStudentRoute
              logged={logged}
              isInGroup={userData?.user?.inGroup}
              userId={userData?.user?.id}
            >
              <StudentPage />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/students/:id/notes"
          element={
            <ProtectedStudentRoute
              logged={logged}
              isInGroup={userData?.user?.inGroup}
              userId={userData?.user?.id}
            >
              <NotesPage />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/students/:id/assignments"
          element={
            <ProtectedStudentRoute
              logged={logged}
              isInGroup={userData?.user?.inGroup}
              userId={userData?.user?.id}
            >
              <AssignmentsPage />
            </ProtectedStudentRoute>
          }
        />

        {/* Not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
