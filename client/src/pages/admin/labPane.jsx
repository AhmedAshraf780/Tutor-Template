import { useEffect, useState } from "react";
import AdminNav from "./shared/nav";
import { adminServices } from "@/services/adminServices";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGroups } from "@/hooks/useGroups";

const LabPane = () => {
  // const [groups, setGroups] = useState([]);
  const { data: groups = [] } = useGroups();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [homeworks, setHomeworks] = useState([]);
  const [exams, setExams] = useState([]);
  const [activeTab, setActiveTab] = useState("homeworks"); // "homeworks" or "exams"
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();


  const fetchAssignments = async (groupId) => {
    const res = await adminServices.getAllAssignmentsForGroup(groupId);
    setHomeworks(res.homeworks || []);
    setExams(res.exams || []);
  };

  const filteredAssignments =
    activeTab === "homeworks"
      ? homeworks.filter((a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : exams.filter((a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <>
      <AdminNav initialTab="lab" />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
          Assignment Correction
        </h2>

        {/* Group Selection */}
        <div className="max-w-lg mx-auto mb-8">
          <select
            className="w-full border-2 border-slate-700 rounded-lg p-3 bg-slate-900 text-white focus:ring-2 focus:ring-blue-400"
            value={selectedGroup}
            onChange={(e) => {
              setSelectedGroup(e.target.value);
              fetchAssignments(e.target.value);
            }}
          >
            <option value="">Select group</option>
            {groups.map((g) => (
              <option key={g._id} value={g._id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {selectedGroup && (
          <div className="max-w-4xl mx-auto">
            {/* Toggle Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setActiveTab("homeworks")}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activeTab === "homeworks"
                    ? "bg-blue-500 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Homeworks
              </button>
              <button
                onClick={() => setActiveTab("exams")}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activeTab === "exams"
                    ? "bg-purple-500 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Exams
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 text-white border border-slate-700 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Assignments Grid */}
            {filteredAssignments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredAssignments.map((a) => (
                  <Card
                    key={a._id}
                    onClick={() =>
                      navigate(
                        `/dashboard/assignmentpage/?assignmentId=${
                          a._id
                        }&type=${activeTab.slice(0, -1)}`,
                      )
                    }
                    className="bg-white/5 border border-slate-700 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        {activeTab === "exams" ? (
                          <FileText className="text-purple-400 w-8 h-8" />
                        ) : (
                          <BookOpen className="text-blue-400 w-8 h-8" />
                        )}
                        <h3 className="text-xl font-semibold text-white">
                          {a.name}
                        </h3>
                      </div>
                      <p className="text-slate-300 text-sm capitalize">
                        Type: {activeTab.slice(0, -1)} {/* homework/exam */}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center">
                No {activeTab} found.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LabPane;
