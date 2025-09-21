import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, Search, Eye, CheckCircle, Target } from "lucide-react";
import StudentNav from "./shared/nav";
import { studentServices } from "@/services/studentServices";
import { useParams } from "react-router-dom";

const AssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState("homeworks");
  const [searchQuery, setSearchQuery] = useState("");
  const [homeworksData, setHomeworksData] = useState([]);
  const [examsData, setExamsData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await studentServices.getAssignements();
    if (res.success) {
      setHomeworksData(res.homeworks);
      setExamsData(res.exams);
    }
  };

  const currentData = activeTab === "homeworks" ? homeworksData : examsData;
  const filteredAssignments = currentData.filter((assignment) => {
    const matchesSearch =
      assignment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const AssignmentCard = ({ assignment }) => {
    const [studentSubmissionUrl, setStudentSubmissionUrl] = useState();

    const fileInputRef = useRef(null);
    const handleUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      // preparing the payload
      alert(id);
      const payload = {
        type: "homework",
        assignmentId: assignment.id,
        solution: file,
        studentId: id,
      };

      const res = await studentServices.submitSolution(payload);

      // TODO: replace with real API upload call
      const fileUrl = URL.createObjectURL(file);
      setStudentSubmissionUrl(fileUrl);
    };

    return (
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 group">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-white capitalize mb-2">
                {assignment.name}
              </h3>
              <p className="text-sm text-blue-400 font-medium">
                Type: {assignment.type}
              </p>
            </div>
          </div>

          {/* Actions */}
          {activeTab === "homeworks" ? (
            <div className="flex flex-col gap-3">
              {/* View Homework */}
              <Button
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open(assignment.url, "_blank")}
              >
                <Eye className="h-4 w-4 mr-2" /> View Homework
              </Button>

              {/* Submit Solution */}
              <Button
                size="sm"
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:opacity-70"
                disabled={!!studentSubmissionUrl}
                onClick={() =>
                  !studentSubmissionUrl && fileInputRef.current.click()
                }
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {studentSubmissionUrl ? "Submitted" : "Submit Solution"}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
                onChange={handleUpload}
              />
              {/* Official Solution (from backend) */}
              {assignment.homeWorkSolution && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  onClick={() =>
                    window.open(assignment.homeWorkSolution, "_blank")
                  }
                >
                  <Target className="h-4 w-4 mr-2" /> Solutions
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {!assignment.isPassed ? (
                <Button
                  size="sm"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => window.open(assignment.url, "_blank")}
                >
                  <Eye className="h-4 w-4 mr-1" /> Start Exam
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  onClick={() => window.open(assignment.url, "_blank")}
                >
                  <CheckCircle className="h-4 w-4 mr-1" /> View Results
                </Button>
              )}
            </div>
          )}

          {/* Student Submission Preview */}
          {activeTab === "homeworks" && studentSubmissionUrl && (
            <div className="mt-4 pt-4 border-t border-slate-700/50 text-sm text-slate-300">
              ✅ Your solution has been submitted.{" "}
              <a
                href={studentSubmissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                View Your Submission
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <StudentNav initialTab="assignments" />

      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
                  <ClipboardList className="h-8 w-8 text-purple-400" />
                  Assignments
                </h1>
                <p className="text-slate-400 mt-2">
                  Track your homework and exam progress
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab("homeworks")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === "homeworks"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-800/40 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                }`}
              >
                📝 Homeworks ({homeworksData.length})
              </button>
              <button
                onClick={() => setActiveTab("exams")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === "exams"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-slate-800/40 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                }`}
              >
                📊 Exams ({examsData.length})
              </button>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/40 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="text-sm text-slate-400">
                Showing {filteredAssignments.length} {activeTab}
              </div>
            </div>
          </div>

          {/* Display */}
          {filteredAssignments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAssignments.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-12 max-w-md mx-auto">
                <ClipboardList className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {searchQuery
                    ? `No ${activeTab} found`
                    : `No ${activeTab} yet`}
                </h3>
                <p className="text-slate-400">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : `No ${activeTab} have been assigned yet. Check back later!`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;
