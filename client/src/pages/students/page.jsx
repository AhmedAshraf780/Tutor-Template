import { useToast } from "@/components/ui/toast";
import StrangeNav from "./shared/strangeNav";

const StudentPage = () => {
  const { showToast } = useToast();

  // Show hero page only if not in group
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden flex flex-col">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Secondary Nav */}
      <StrangeNav initialTab={"contactus"} />

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-10 max-w-2xl mx-auto text-center hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Unlock Your Potential
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            You are currently{" "}
            <span className="text-blue-400 font-semibold">
              not yet a student
            </span>{" "}
            of{" "}
            <span className="text-purple-400 font-semibold">
              Mr. Amr Ashraf
            </span>
            . Join a thriving community of learners, challenge yourself, and
            take the next step toward academic excellence.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg text-white font-medium transition"
          >
            Contact Us to Get Started
          </a>
        </div>
      </section>
    </div>
  );
};

export default StudentPage;
