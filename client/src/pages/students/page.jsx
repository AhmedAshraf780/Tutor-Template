import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  PenTool,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
  Star,
  Brain,
  Calculator,
  FileText,
  User,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  Users,
  Zap,
  Trophy,
  GraduationCap,
  ChevronRight,
  Activity,
  BookMarked,
  ClipboardList
} from "lucide-react";
import { admin } from "@/constants/admin";
import StudentNav from "./shared/nav";

const StudentPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [studentData, setStudentData] = useState({
    name: "Ahmed Hassan",
    grade: "Grade 10",
    progress: 75,
    totalAssignments: 24,
    completedAssignments: 18,
    upcomingTests: 3,
    currentStreak: 7,
    rank: 5,
    totalStudents: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const recentActivities = [
    {
      id: 1,
      type: "assignment",
      title: "Algebra Worksheet #12",
      status: "completed",
      score: 95,
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 2,
      type: "test",
      title: "Geometry Quiz",
      status: "upcoming",
      time: "Tomorrow 10:00 AM",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 3,
      type: "note",
      title: "Trigonometry Notes",
      status: "viewed",
      time: "1 day ago",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ];

  const quickStats = [
    {
      title: "Overall Progress",
      value: `${studentData.progress}%`,
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-500",
      description: "This month"
    },
    {
      title: "Assignments",
      value: `${studentData.completedAssignments}/${studentData.totalAssignments}`,
      change: "+3",
      trend: "up",
      icon: ClipboardList,
      gradient: "from-emerald-500 to-teal-500",
      description: "Completed"
    },
    {
      title: "Class Rank",
      value: `#${studentData.rank}`,
      change: "+2",
      trend: "up",
      icon: Trophy,
      gradient: "from-purple-500 to-pink-500",
      description: `Out of ${studentData.totalStudents}`
    },
    {
      title: "Study Streak",
      value: `${studentData.currentStreak}`,
      change: "+1",
      trend: "up",
      icon: Zap,
      gradient: "from-orange-500 to-red-500",
      description: "Days active"
    }
  ];

  const upcomingSchedule = [
    {
      id: 1,
      title: "Calculus Class",
      time: "10:00 AM - 11:30 AM",
      date: "Today",
      type: "class",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Physics Lab",
      time: "2:00 PM - 3:30 PM",
      date: "Tomorrow",
      type: "lab",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Math Test",
      time: "9:00 AM - 10:30 AM",
      date: "Friday",
      type: "test",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <StudentNav initialTab="dashboard" />
      
      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{studentData.name}!</span>
                </h1>
                <p className="text-gray-600 mt-2 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  {studentData.grade} • Learning with {admin.name}
                </p>
              </div>
              <div className="bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Current Time</p>
                  <p className="text-xl font-bold text-gray-900">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                        stat.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        Recent Activities
                      </CardTitle>
                      <CardDescription>Your latest learning progress</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200 group cursor-pointer">
                        <div className={`p-3 rounded-xl ${activity.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                          <Icon className={`h-5 w-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{activity.title}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {activity.time}
                          </p>
                        </div>
                        {activity.score && (
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">{activity.score}%</p>
                            <p className="text-xs text-gray-500">Score</p>
                          </div>
                        )}
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Progress Chart Card */}
              <Card className="border-0 shadow-lg mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Learning Progress
                  </CardTitle>
                  <CardDescription>Your performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Algebra</span>
                        <span className="text-sm font-bold text-blue-600">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Geometry</span>
                        <span className="text-sm font-bold text-green-600">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Calculus</span>
                        <span className="text-sm font-bold text-purple-600">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Notes
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-green-50 hover:border-green-300">
                    <ClipboardList className="h-4 w-4 mr-2 text-green-600" />
                    New Assignment
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-purple-50 hover:border-purple-300">
                    <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                    Schedule Study
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-orange-50 hover:border-orange-300">
                    <User className="h-4 w-4 mr-2 text-orange-600" />
                    Contact Tutor
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Schedule */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Upcoming Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSchedule.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
                      <div className={`w-1 ${item.color} rounded-full`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h4>
                        <p className="text-xs text-gray-600">{item.time}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Achievement Badge */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">Great Job!</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      You're in the top 15% of students this month!
                    </p>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
                    View Achievements
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
