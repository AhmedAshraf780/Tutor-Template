import { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast.jsx";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const { showToast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    if (otp.length !== 6) {
      showToast({
        title: "Invalid code",
        description: "Please enter the 6-digit code",
        variant: "error",
      });
      return;
    }
    showToast({
      title: "Verified",
      description: "OTP accepted",
      variant: "success",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12 flex justify-center items-center">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Verify code
          </h1>
          <p className="mt-2 text-gray-600">
            Enter the 6-digit code we sent to your email/phone.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
        >
          <div className="flex justify-center">
            <InputOTP
              value={otp}
              onChange={setOtp}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              containerClassName="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Verify
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            Didn’t get a code?{" "}
            <button
              type="button"
              onClick={() =>
                showToast({ title: "Code resent", variant: "success" })
              }
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Resend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
