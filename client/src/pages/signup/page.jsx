import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast.jsx";
import {
  Form,
  FormDescription,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { authService } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const egyptPhoneRegex = /^(011|010|012|015)\d{8}$/;

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
  age: z
    .preprocess((v) => Number(v), z.number().int().min(5).max(20))
    .refine((v) => !Number.isNaN(v), "Enter a valid age"),
  grade: z
    .preprocess((v) => Number(v), z.number().int().min(1).max(9))
    .refine((v) => !Number.isNaN(v), "Select a grade"),
  address: z.string().min(3, "Address is too short"),
  phone: z
    .string()
    .regex(egyptPhoneRegex, "Enter a valid Egyptian phone (e.g. 010xxxxxxxx)"),
  place: z.enum(["educational center", "private lessons"], {
    errorMap: () => ({ message: "Choose a place" }),
  }),
});

export default function Signup() {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values) {
    try {
      // simulate submit
      await new Promise((r) => setTimeout(r, 200));

      reset();

      const res = await authService.sendOTPTOEmail(values);

      if (res.success) {
        showToast({
          title: res.message,
          description: "Welcome aboard!",
          variant: "success",
        });

        navigate(`/auth/verifyotp?id=${res.sessionId}`);
      } else {
        showToast({
          title: res.message,
          variant: "failure",
        });
      }
    } catch (err) {
      showToast({
        title: "Something went wrong",
        variant: "failure",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-gray-600">Join and start learning today.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
        >
          <FormField className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your full name"
              {...register("name")}
            />
            <FormMessage>{errors.name?.message}</FormMessage>
          </FormField>

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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
            <FormField>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="5"
                max="20"
                {...register("age")}
              />
              <FormMessage>{errors.age?.message}</FormMessage>
            </FormField>

            <FormField>
              <Label htmlFor="grade">Grade</Label>
              <Select id="grade" defaultValue="" {...register("grade")}>
                <option value="" disabled>
                  Select grade
                </option>
                {Array.from({ length: 9 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Select>
              <FormMessage>{errors.grade?.message}</FormMessage>
            </FormField>
          </div>

          <FormField className="mb-4">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Your address"
              {...register("address")}
            />
            <FormMessage>{errors.address?.message}</FormMessage>
          </FormField>

          <FormField className="mb-4">
            <Label htmlFor="phone">Phone (Egypt)</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              {...register("phone")}
            />
            <FormMessage>{errors.phone?.message}</FormMessage>
          </FormField>

          <FormField className="mb-4">
            <Label htmlFor="place">Place</Label>
            <Select id="place" defaultValue="" {...register("place")}>
              <option value="" disabled>
                Select place
              </option>
              <option value="educational center">educational center</option>
              <option value="private lessons">private lessons</option>
            </Select>
            <FormMessage>{errors.place?.message}</FormMessage>
          </FormField>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isSubmitting ? "Submitting..." : "Sign up"}
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
