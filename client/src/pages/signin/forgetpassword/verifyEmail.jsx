// src/pages/VerifyEmail.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // shadcn input
import { useToast } from "@/components/ui/toast.jsx";
import { authService } from "@/services/auth";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    // super-light validation
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmail) {
      showToast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "error",
      });
      return;
    }

    try {
      setPending(true);
      await new Promise((r) => setTimeout(r, 200));

      const res = await authService.forgotPassword(email);
      if (res.success) {
        navigate("/signin");
      } else {
        showToast({
          title: res.message,
          variant: "error",
        });
      }
    } catch (err) {
      showToast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "error",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Verify your email
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Enter your email and we’ll send you a verification code.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={pending}
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {pending ? "Sending..." : "Send verification code"}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4">
            Didn’t receive it? Check spam or try again in a minute.
          </p>
        </div>
      </div>
    </div>
  );
}
