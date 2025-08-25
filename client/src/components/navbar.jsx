import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, Calculator, BookOpen } from "lucide-react";
import { admin } from "@/constants/admin";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <Calculator className="h-8 w-8" />
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            onClick={() => {
              navigate("/", { state: { scrollTo: "herosection" } });
            }}
          >
            {admin.name}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            onClick={() => {
              navigate("/", { state: { scrollTo: "schedules" } });
            }}
          >
            Schedules
          </button>
          <button
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            onClick={() => {
              navigate("/", { state: { scrollTo: "aboutus" } });
            }}
          >
            About Us
          </button>
          <button
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            onClick={() => {
              navigate("/", { state: { scrollTo: "contactus" } });
            }}
          >
            Contact Us
          </button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-gray-300 hover:border-blue-600 hover:text-blue-600"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white border-t border-gray-100">
          <button
            className="block py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            onClick={() => {
              navigate("/", { state: { scrollTo: "schedules" } });
            }}
          >
            Schedules
          </button>
          <button
            className="block py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            onClick={() => {
              navigate("/", { state: { scrollTo: "aboutus" } });
            }}
          >
            About Us
          </button>
          <button
            className="block py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            onClick={() => {
              navigate("/", { state: { scrollTo: "contactus" } });
            }}
          >
            Contact Us
          </button>
          <div className="mt-4 flex flex-col gap-3">
            <Button
              variant="outline"
              className="border-gray-300 hover:border-blue-600 hover:text-blue-600"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
