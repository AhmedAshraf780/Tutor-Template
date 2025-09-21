import {
  BarChart3,
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  Activity,
  Clock,
  Award,
} from "lucide-react";
import AdminNav from "./shared/nav";

export default function Dashboard() {
  // I will fetch all the users and group here

  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Groups",
      value: "45",
      change: "+8%",
      changeType: "positive",
      icon: GraduationCap,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Assignments",
      value: "89",
      change: "+23%",
      changeType: "positive",
      icon: FileText,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+5%",
      changeType: "positive",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New student registered",
      user: "John Doe",
      time: "2 minutes ago",
      type: "user",
    },
    {
      id: 2,
      action: "Group created",
      user: "Math Group A",
      time: "15 minutes ago",
      type: "group",
    },
    {
      id: 3,
      action: "Assignment submitted",
      user: "Sarah Wilson",
      time: "1 hour ago",
      type: "assignment",
    },
    {
      id: 4,
      action: "New student registered",
      user: "Mike Johnson",
      time: "2 hours ago",
      type: "user",
    },
    {
      id: 5,
      action: "Group updated",
      user: "Science Group B",
      time: "3 hours ago",
      type: "group",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <AdminNav initialTab="overview" />

      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Welcome back! Here's what's happening with your students and groups
            today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="group bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      stat.changeType === "positive"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Recent Activity
                  </h2>
                </div>
                <button className="text-slate-400 hover:text-white transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === "user"
                          ? "bg-blue-500/20"
                          : activity.type === "group"
                          ? "bg-purple-500/20"
                          : "bg-emerald-500/20"
                      }`}
                    >
                      {activity.type === "user" && (
                        <Users className="w-5 h-5 text-blue-400" />
                      )}
                      {activity.type === "group" && (
                        <GraduationCap className="w-5 h-5 text-purple-400" />
                      )}
                      {activity.type === "assignment" && (
                        <FileText className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {activity.action}
                      </p>
                      <p className="text-slate-400 text-sm">{activity.user}</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Clock className="w-4 h-4" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Quick Stats</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">This Week</span>
                  <span className="text-white font-semibold">+24 students</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">New Groups</span>
                  <span className="text-white font-semibold">3 created</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Assignments</span>
                  <span className="text-white font-semibold">12 pending</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Avg. Score</span>
                  <span className="text-white font-semibold">87%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl text-white font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105">
                  <Users className="w-5 h-5" />
                  Add New Student
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105">
                  <GraduationCap className="w-5 h-5" />
                  Create Group
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-2xl text-white font-medium transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105">
                  <FileText className="w-5 h-5" />
                  New Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
