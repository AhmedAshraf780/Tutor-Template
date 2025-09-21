import React, { useEffect, useState } from "react";
import AdminNav from "./shared/nav";
import { adminServices } from "@/services/adminServices";
import { useSearchParams } from "react-router-dom";
import { FileText, Phone, Award, Clock } from "lucide-react";

const AssignementCard = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const assignmentId = searchParams.get("assignmentId");

  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    const res = await adminServices.getSolutionsForAssignment(
      assignmentId,
      type,
    );
    if (res.success) {
      setSolutions(res.solutions);
    }
  };

  return (
    <>
      <AdminNav initialTab={"lab"} />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-400 mb-10">
            {type === "exam" ? "Exam" : "Homework"} Solutions
          </h2>

          {/* Solutions List */}
          {solutions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {solutions.map((solution) => (
                <div
                  key={solution._id}
                  className="bg-white/5 border border-slate-800 rounded-2xl shadow-lg backdrop-blur-xl p-6 hover:scale-105 hover:border-blue-500 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <FileText className="text-purple-400 w-10 h-10" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                        {solution.name}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {type === "exam" ? "Exam" : "Homework"} Submission
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6 text-slate-300">
                    <p className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-400">
                        <Phone className="w-4 h-4" /> Phone
                      </span>
                      <span className="font-medium">{solution.phone}</span>
                    </p>

                    <p className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-400">
                        <Award className="w-4 h-4" /> Grade
                      </span>
                      <span>{solution.grade}</span>
                    </p>

                    <p className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-4 h-4" /> Submitted
                      </span>
                      <span className="font-medium">
                        {new Date(solution.submittedAt).toLocaleString()}
                      </span>
                    </p>
                  </div>

                  {/* Action Button */}
                  <a
                    href={solution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center text-lg">
              No solutions uploaded yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AssignementCard;
