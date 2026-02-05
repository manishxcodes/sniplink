"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/services/auth-service";
import { requestOtp, verifyOtp } from "@/services/otp-service";
import Link from "next/link";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { toast } from "sonner";

interface SignupFormProps {
  onSuccess: () => void;
}

type Step = "email" | "otp" | "details";

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [step, setStep] = useState<Step>("email");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await requestOtp({ email: formData.email });
      ////console.log("OTP sent", response);
      if (response) {
        toast.success("OTP sent");
        setStep("otp");
      }
      //console.log("response: ", response);
    } catch (err: any) {
      setError(err.response.data.message || "Failed to send OTP");
      toast.error(err.response.data?.message);
      //console.log("error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await verifyOtp({ email: formData.email, otp });
      setVerificationToken(response.data.verificationToken);
      if (response) {
        toast.success("OTP verified");
        setStep("details");
      }
      //console.log("OTP verified:", response);
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP");
      toast.error(err.response.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signup(formData, verificationToken);
      //console.log("Signup Success: ", result);
      toast.success("Signup Successfull");
      onSuccess();
    } catch (err: any) {
      setError(err.response?.message || `Signup failed`);
      //console.log("error", error);
      toast.error("Failed to Signup");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp("");
    setError(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card className="w-full max-w-sm">
        {step === "email" && (
          <form onSubmit={handleOtpRequest}>
            <CardHeader>
              <CardTitle>Create new account</CardTitle>
              <CardDescription>Enter your email to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending OTP..." : "Get OTP"}
              </Button>
              <div className="flex items-center text-sm">
                <p>Already have an account? </p>
                <Link href={"/signin"}>
                  <Button variant="link" className="underline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <CardHeader>
              <CardTitle>Verify OTP</CardTitle>
              <CardDescription className="mb-2">
                Enter the OTP sent to {formData.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="flex flex-col gap-6 items-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    className="mx-auto"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleBackToEmail}
                disabled={loading}
              >
                Back
              </Button>
            </CardFooter>
          </form>
        )}

        {step === "details" && (
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Complete your profile</CardTitle>
              <CardDescription className="mb-4">
                Enter your details to complete signup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Enter your first name"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Enter your last name"
                    required
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter a strong password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleBackToEmail}
                disabled={loading}
              >
                Back
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
