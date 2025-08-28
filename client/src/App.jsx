import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import { authService } from "./services/auth.js";

function App() {
  const location = useLocation();
  const navRoutes = ["/", "/signin", "/signup", "/auth/verifyotp"];
  const showNav = navRoutes.includes(location.pathname);

  const [logged, setLogged] = useState(null); // null = loading
  const [userData, setUserData] = useState();

  useEffect(() => {
    (async () => {
      const res = await authService.isLogged();
      alert(res.logged);
      setUserData(res.user);
      setLogged(res.logged);
    })();
  }, []);

  // if (logged === null) return <div>Loading...</div>; // avoid flicker

  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        {/* Public routes */}
        {!logged ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/auth/verifyotp" element={<OtpVerify />} />
            <Route path="/auth/forgotpassword" element={<VerifyEmail />} />
            <Route
              path="/auth/restorepassword/:sessionId"
              element={<ResetPassword />}
            />
          </>
        ) : (
          // if logged in and tries to access auth routes -> redirect
          <>
            <Route path="/" element={<Navigate to="/students" replace />} />
            <Route
              path="/signup"
              element={<Navigate to="/students" replace />}
            />
            <Route
              path="/signin"
              element={<Navigate to="/students" replace />}
            />
            <Route
              path="/auth/verifyotp"
              element={<Navigate to="/students" replace />}
            />
            <Route
              path="/auth/forgotpassword"
              element={<Navigate to="/students" replace />}
            />
            <Route
              path="/auth/restorepassword/:sessionId"
              element={<Navigate to="/students" replace />}
            />
          </>
        )}

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute logged={logged}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/students" element={<StudentPage />} />

        {/* Not found */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
