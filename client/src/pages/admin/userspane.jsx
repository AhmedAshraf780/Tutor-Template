import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  MapPin,
  Calendar,
  Phone,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import AdminNav from "./shared/nav";
import { useStudents } from "@/hooks/studentHook";

const Userpane = () => {
  const { data: users = [], isLoading, isError, error } = useStudents();
  const [searchTerm, setSearchTerm] = useState("");

  const term = searchTerm.toLowerCase();
  const filteredUsers = users.filter((user) => {
    const name = (user?.name ?? "").toLowerCase();
    const email = (user?.email ?? "").toLowerCase();
    return name.includes(term) || email.includes(term);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <AdminNav initialTab="users" />

      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Student Management
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Manage and organize your students with powerful tools and insights
          </p>
        </div>

        {/* Search + Actions Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800/70 transition-all duration-300 text-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white transition-all duration-300 backdrop-blur-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Total Students
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {users.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Active Students
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {filteredUsers.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Search Results
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {filteredUsers.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-lg">Loading students...</p>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center">
              <span className="text-red-400 text-2xl">⚠️</span>
            </div>
            <p className="text-red-400 text-lg">
              {error?.message || "Failed to load students"}
            </p>
          </div>
        )}

        {/* Student Cards */}
        {!isLoading &&
          !isError &&
          (filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredUsers.map((user, index) => {
                const initials = (
                  (user?.name ?? "")
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("") || "NA"
                ).toUpperCase();

                return (
                  <div
                    key={user.id ?? `${user.email}-${initials}`}
                    className="group bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/25">
                            {initials}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {user?.name ?? "Unnamed"}
                          </h3>
                          <p className="text-slate-400 flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4" />
                            {user?.email ?? "—"}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>

                    {/* Student Details */}
                    <div className="space-y-4">
                      {user?.place && (
                        <div className="flex items-center gap-3 text-slate-300">
                          <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide">
                              Location
                            </p>
                            <p className="font-medium">{user.place}</p>
                          </div>
                        </div>
                      )}

                      {user?.age && (
                        <div className="flex items-center gap-3 text-slate-300">
                          <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide">
                              Age
                            </p>
                            <p className="font-medium">{user.age} years old</p>
                          </div>
                        </div>
                      )}

                      {user?.grade && (
                        <div className="flex items-center gap-3 text-slate-300">
                          <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide">
                              Grade
                            </p>
                            <p className="font-medium">Grade {user.grade}</p>
                          </div>
                        </div>
                      )}

                      {user?.phone && (
                        <div className="flex items-center gap-3 text-slate-300">
                          <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide">
                              Phone
                            </p>
                            <p className="font-medium">{user.phone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="w-24 h-24 bg-slate-800/50 rounded-3xl flex items-center justify-center">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-slate-300">
                  No students found
                </h3>
                <p className="text-slate-500 max-w-md">
                  {searchTerm
                    ? "Try adjusting your search terms or filters"
                    : "Get started by adding your first student"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Userpane;

