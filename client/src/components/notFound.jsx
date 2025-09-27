import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Funny Content */}
      <div className="relative z-10 text-center p-10 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl max-w-xl mx-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-pink-400">
          404
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-6">
          Oops! Looks like you tried to skip class.
          This page doesn’t exist — maybe it’s hiding in the syllabus 🤔
        </p>
        <p className="text-slate-400 mb-8 italic">
          Don’t worry, even Einstein got lost sometimes.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg text-white font-medium transition"
        >
          📚 Back to Class
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

