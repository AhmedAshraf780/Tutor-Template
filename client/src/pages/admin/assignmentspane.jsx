import { useEffect, useState } from "react";
import AdminNav from "./shared/nav";
import { adminServices } from "@/services/adminServices";
import { useToast } from "@/components/ui/toast";

const Assignmentspane = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);
  const [googleForm, setGoogleForm] = useState("");
  const [pdfAssignment, setPdfAssignment] = useState(null);
  const [pdfSolution, setPdfSolution] = useState(null);

  const { showToast } = useToast();

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      name,
      type,
      groupId,
      googleForm,
      pdfAssignment,
      pdfSolution,
    };
    const res = await adminServices.createAssignment(payload);
    if (res.success) {
      showToast({
        title: "Assignment Created",
        description: res.message,
        variant: "success",
      });
    }
  };

  const fetchGroups = async () => {
    const res = await adminServices.getMyGroups();
    setGroups(res);
  };

  return (
    <>
      <AdminNav initialTab={"assignments"} />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl bg-white/5 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-800 backdrop-blur-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-blue-400 tracking-tight text-center">
            Create Assignment
          </h2>

          {/* Assignment Name */}
          <div className="mb-5 sm:mb-6">
            <label className="block mb-2 font-semibold text-slate-300 text-sm sm:text-base">
              Assignment Name
            </label>
            <input
              type="text"
              placeholder="Enter assignment name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-slate-700 rounded-lg p-2.5 sm:p-3 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
            />
          </div>

          {/* Assignment Type */}
          <div className="mb-5 sm:mb-6">
            <label className="block mb-2 font-semibold text-slate-300 text-sm sm:text-base">
              Type
            </label>
            <select
              className="w-full border-2 border-slate-700 rounded-lg p-2.5 sm:p-3 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="homework">Homework</option>
              <option value="exam">Exam</option>
            </select>
          </div>

          {/* Group */}
          <div className="mb-5 sm:mb-6">
            <label className="block mb-2 font-semibold text-slate-300 text-sm sm:text-base">
              Assign to Group
            </label>
            <select
              className="w-full border-2 border-slate-700 rounded-lg p-2.5 sm:p-3 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            >
              <option value="">Select group</option>
              {groups.map((g) => (
                <option key={g.id} value={g._id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Google Form Link */}
          <div className="mb-5 sm:mb-6">
            <label className="block mb-2 font-semibold text-slate-300 text-sm sm:text-base">
              Google Form Link
            </label>
            <input
              type="url"
              placeholder="https://forms.gle/..."
              value={googleForm}
              onChange={(e) => setGoogleForm(e.target.value)}
              className="w-full border-2 border-slate-700 rounded-lg p-2.5 sm:p-3 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
            />
          </div>

          {/* Conditional PDF Uploads */}
          {type === "exam" ? (
            <div className="mb-5 sm:mb-6">
              <label className="block mb-2 font-semibold text-slate-300 text-sm sm:text-base">
                Exam PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfAssignment(e.target.files[0])}
                className="w-full border-2 border-slate-700 rounded-lg p-2.5 sm:p-3 bg-slate-900 text-white text-sm sm:text-base file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {pdfAssignment && (
                <div className="mt-2 text-xs text-green-400 font-medium truncate">
                  {pdfAssignment.name}
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
              <div>
                <label className="block mb-2 font-semibold text-slate-300 text-sm sm:text-base">
                  Assignment PDF
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfAssignment(e.target.files[0])}
                  className="w-full border-2 border-slate-700 rounded-lg p-2.5 sm:p-3 bg-slate-900 text-white text-sm sm:text-base file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {pdfAssignment && (
                  <div className="mt-2 text-xs text-green-400 font-medium truncate">
                    {pdfAssignment.name}
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-2 font-semibold text-slate-300 text-sm sm:text-base">
                  Solution PDF
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfSolution(e.target.files[0])}
                  className="w-full border-2 border-slate-700 rounded-lg p-2.5 sm:p-3 bg-slate-900 text-white text-sm sm:text-base file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {pdfSolution && (
                  <div className="mt-2 text-xs text-green-400 font-medium truncate">
                    {pdfSolution.name}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:scale-105 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            onClick={handleSubmit}
            disabled={
              !name || !type || !groupId || (!googleForm && !pdfAssignment)
            }
            aria-disabled={
              !name || !type || !groupId || (!googleForm && !pdfAssignment)
            }
          >
            Create Assignment
          </button>
        </div>
      </div>
    </>
  );
};

export default Assignmentspane;
