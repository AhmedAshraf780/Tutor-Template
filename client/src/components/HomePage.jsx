import { Button } from "@/components/ui/button";
import { admin, schedules } from "@/constants/admin";
import {
  Calculator,
  Users,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Brain,
  TrendingUp,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import Navbar from "./navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const imageSrc = (admin.image || "/tutor.jpeg").replace("/public", "");
  const whatsappLink = `https://wa.me/${admin.whatsapp}`;
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      {" "}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 scroll-mt-28"
          id="herosection"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 mb-6">
                  <Star className="mr-2 h-4 w-4" />
                  Trusted by 1,000+ students
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Master Math with
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}
                    {admin.name}
                  </span>
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  Transform your mathematical journey with personalized
                  tutoring, interactive lessons, and proven strategies that make
                  learning math engaging and effective.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => {
                      document
                        .getElementById("contactus")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-gray-300 hover:border-green-600 hover:text-green-600"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -top-8 -right-8 h-56 w-56 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-30"></div>
                  <img
                    src={imageSrc}
                    alt={`${admin.name} portrait`}
                    className="relative w-full max-w-lg rounded-3xl shadow-2xl ring-1 ring-black/5 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          className="px-4 py-20 sm:px-6 lg:px-8 scroll-mt-28"
          id="aboutus"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Why Learn With {admin.name.split(" ")[0]}?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Experience the difference with our comprehensive approach to
                math education
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  Personalized Learning
                </h3>
                <p className="mt-4 text-gray-600">
                  Tailored lessons that adapt to your learning style and pace,
                  ensuring maximum comprehension.
                </p>
              </div>
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  Concept Mastery
                </h3>
                <p className="mt-4 text-gray-600">
                  Deep understanding of mathematical concepts through
                  interactive examples and real-world applications.
                </p>
              </div>
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  Progress Tracking
                </h3>
                <p className="mt-4 text-gray-600">
                  Monitor your improvement with detailed analytics and celebrate
                  your mathematical achievements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Schedules Section */}
        <section
          className="px-4 py-20 sm:px-6 lg:px-8 bg-white scroll-mt-28"
          id="schedules"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl flex items-center gap-3">
                  <Calendar className="h-7 w-7 text-blue-600" /> Weekly Schedule
                </h2>
                <p className="mt-3 text-gray-600">
                  Find the session times and location for classes.
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{admin.address}</span>
                <span className="hidden sm:inline">•</span>
                <Phone className="h-4 w-4 text-blue-600" />
                <a
                  href={`tel:${admin.telephone}`}
                  className="hover:text-blue-700"
                >
                  {admin.telephone}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(schedules).map(([day, time]) => (
                <div
                  key={day}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" /> {day}
                    </h3>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="mt-3 text-gray-600">
                    {time && time.trim().length > 0
                      ? time
                      : "No sessions scheduled"}
                  </p>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        admin.address,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-300"
                      >
                        <MapPin className="mr-2 h-4 w-4" /> View Location
                      </Button>
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" /> Ask About
                        This Day
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="px-4 py-20 sm:px-6 lg:px-8 scroll-mt-28"
          id="contactus"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Transform Your Math Skills?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of students who have already improved their
              mathematical abilities with our proven methods.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Contact on WhatsApp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href={`mailto:${admin.email}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                >
                  Email {admin.name.split(" ")[0]}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <Calculator className="h-8 w-8 text-blue-400" />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {admin.name}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Empowering students to master mathematics through personalized
                  learning experiences and expert guidance.
                </p>
                <div className="flex space-x-4">
                  <a
                    href={admin.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={admin.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={admin.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <button
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      onClick={() => {
                        document
                          .getElementById("schedules")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Schedules
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      onClick={() => {
                        document
                          .getElementById("aboutus")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      onClick={() => {
                        document
                          .getElementById("contactus")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Contact Us
                    </button>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Services</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="text-gray-400">One-on-One Tutoring</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Group Classes</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Online Courses</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Test Preparation</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Homework Help</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-blue-400" />
                    <a
                      href={`tel:${admin.telephone}`}
                      className="text-gray-400 hover:text-white"
                    >
                      {admin.telephone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <a
                      href={`mailto:${admin.email}`}
                      className="text-gray-400 hover:text-white"
                    >
                      {admin.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-400">{admin.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-4 w-4 text-green-400" />
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors duration-200"
                    >
                      {admin.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="mt-12 pt-8 border-t border-gray-800" id="contactus">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} {admin.name}. All rights
                  reserved.
                </p>
                <div className="flex space-x-6 text-sm">
                  <span className="text-gray-400 ">Privacy Policy</span>
                  <span className="text-gray-400">Terms of Service</span>
                  <span className="text-gray-400">Cookie Policy</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
