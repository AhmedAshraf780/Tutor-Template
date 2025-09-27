import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/toast.jsx";
import { authService } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

export default function Signin() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values) {
    await new Promise((r) => setTimeout(r, 200));
    console.log("Signin values:", values);
    try {
      const res = await authService.signIn(values.email, values.password);
      if (res.success) {
        showToast({
          title: "Signed in",
          description: res.message,
          variant: "success",
        });

        if (res.user.isAdmin) {
          navigate("/dashboard/myGroups");
        } else {
          navigate(`/students/${res.user.id}`);
        }
      } else {
        showToast({
          title: res.message,
          variant: "error",
        });
      }
    } catch (err) {
      console.log(err);
      showToast({
        title: `Failed To Sign in ${err}`,
        variant: "error",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h1>
          <p className="mt-2 text-gray-600">Welcome back, continue learning.</p>
        </div>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
        >
          <FormField className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            <FormMessage>{errors.email?.message}</FormMessage>
          </FormField>

          <FormField className="mb-4">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <FormMessage>{errors.password?.message}</FormMessage>
          </FormField>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>
          <div className="mt-4 text-center">
            <a
              href="/auth/forgotpassword"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </a>
          </div>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
