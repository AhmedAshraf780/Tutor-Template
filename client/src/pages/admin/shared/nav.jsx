import { useState } from "react";
import {
  GraduationCap,
  Users,
  FileText,
  LogOut,
  Menu,
  Laptop,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { admin } from "@/constants/admin";
import { authService } from "@/services/auth";
import { useToast } from "@/components/ui/toast";

const AdminNav = ({ initialTab }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  const { showToast } = useToast();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await authService.logout();
    if (res.success) {
      showToast({
        title: "Logging out successfully..",
        variant: "success",
      });

      setOpen(false); // close mobile menu if open
      return navigate("/signin");
    } else {
      showToast({
        title: "Failed to logout",
        variant: "error",
      });
    }
  };

  const navItems = [
    {
      id: "users",
      label: "Users",
      icon: Users,
      onClick: () => {
        setActiveTab("users");
        navigate("/dashboard/users");
      },
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "groups",
      label: "Groups",
      icon: GraduationCap,
      onClick: () => {
        setActiveTab("groups");
        navigate("/dashboard/mygroups");
      },
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "assignments",
      label: "Assignments",
      icon: FileText,
      onClick: () => {
        setActiveTab("assignments");
        navigate("/dashboard/assignments");
      },
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "lab",
      label: "Lab",
      icon: Laptop,
      onClick: () => {
        setActiveTab("lab");
        navigate("/dashboard/lab");
      },
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo + Title */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {admin?.name}
                </h1>
                <p className="text-xs text-slate-400 -mt-1">Admin Dashboard</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className={`group relative flex items-center gap-3 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-slate-800/60 text-white shadow-lg shadow-slate-800/20"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                    }`}
                  >
                    {isActive && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 rounded-2xl`}
                      ></div>
                    )}
                    <div
                      className={`relative flex items-center gap-3 ${
                        isActive
                          ? "text-white"
                          : "group-hover:scale-110 transition-transform"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <div
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r ${item.gradient} rounded-full`}
                      ></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-3 hover:bg-slate-800/50 rounded-2xl transition-all duration-300"
              onClick={() => setOpen(!open)}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`w-6 h-6 text-slate-300 transition-all duration-300 ${
                    open ? "opacity-0 rotate-180" : "opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 text-slate-300 transition-all duration-300 ${
                    open ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 lg:hidden animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onClick();
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-slate-800/60 text-white shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive
                        ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                        : "bg-slate-800/50 group-hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-slate-700/50 space-y-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-2xl text-white font-medium transition-all duration-300 shadow-lg shadow-red-500/25"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <LogOut className="w-5 h-5" />
                </div>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNav;
