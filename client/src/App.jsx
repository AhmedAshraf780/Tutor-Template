import "./App.css";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/page";
import Navbar from "./components/navbar";
import Signin from "./pages/signin/page";
import { useLocation } from "react-router-dom";
import OtpVerify from "./pages/signup/otp";

function App() {
  const location = useLocation();
  const navRoutes = ["/", "/signin", "/signup", "/auth/otpverify"];
  const showNav = navRoutes.includes(location.pathname);
  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/auth/otpverify" element={<OtpVerify />} />
      </Routes>
    </>
  );
}

export default App;
