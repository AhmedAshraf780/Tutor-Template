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

  async function onSubmit(values) {
    // simulate submit
    await new Promise((r) => setTimeout(r, 600));
    console.log("Signup values:", values);
    reset();
    showToast({
      title: "Signed up successfully",
      description: "Welcome aboard!",
      variant: "success",
    });
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

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
        >
          <FormField>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your full name"
              {...register("name")}
            />
            <FormMessage>{errors.name?.message}</FormMessage>
          </FormField>

          <FormField>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            <FormMessage>{errors.email?.message}</FormMessage>
          </FormField>

          <FormField>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            <FormMessage>{errors.password?.message}</FormMessage>
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

          <FormField>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Your address"
              {...register("address")}
            />
            <FormMessage>{errors.address?.message}</FormMessage>
          </FormField>

          <FormField>
            <Label htmlFor="phone">Phone (Egypt)</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              {...register("phone")}
            />
            <FormMessage>{errors.phone?.message}</FormMessage>
          </FormField>

          <FormField>
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
        </Form>
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
