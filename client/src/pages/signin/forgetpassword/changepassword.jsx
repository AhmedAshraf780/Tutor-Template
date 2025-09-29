import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/toast.jsx";
import { authService } from "@/services/auth";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

// Zod schema for form validation
// This schema now validates both password and confirm password
const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  // Refine the schema to ensure the passwords match
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export default function ResetPassword() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { sessionId } = useParams();
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(false);

  // Initialize react-hook-form with the new password schema
  const form = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = form;

  useEffect(() => {
    const checkSession = async () => {
      const data = await authService.checkSessionId(sessionId);
      if (!data.valid) {
        setValid(false);
        navigate("/signup");
      } else {
        setValid(true);
      }
    };
    checkSession();
  }, [navigate]);

  // The onSubmit function now handles the password reset logic
  async function onSubmit(values) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const res = await authService.resetPassword(values.password, sessionId);
      if (res.success) {
        showToast({
          title: "Success!",
          description: "Your password has been reset.",
          variant: "success",
        });
        // Redirect the user to the sign-in page after a successful reset
        navigate("/signin");
      } else {
        showToast({
          title: `Password reset failed: ${res.message}`,
          variant: "error",
        });
      }
    } catch (err) {
      showToast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "error",
      });
    }
  }

  return (
    valid && (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Reset Password
            </h1>
            <p className="mt-2 text-gray-600">Enter your new password below.</p>
          </div>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <FormField className="mb-4">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="pr-10" // Add padding to make space for the button
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute inset-y-0 right-0 h-full p-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              <FormMessage>{errors.password?.message}</FormMessage>
            </FormField>

            <FormField className="mb-4">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute inset-y-0 right-0 h-full p-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              <FormMessage>{errors.confirmPassword?.message}</FormMessage>
            </FormField>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isSubmitting ? "Submitting..." : "Reset Password"}
              </Button>
            </div>
          </Form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <a
              href="/signin"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    )
  );
}
