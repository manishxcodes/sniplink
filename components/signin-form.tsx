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
import { signin } from "@/services/auth-service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SigninForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("form data", formData);

    setError(null);
    setLoading(true);

    try {
      const result = await signin(formData);
      //console.log("Signin Success: ", result);
      router.push("/dashboard");

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || `Signup failed`);
      toast.error("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <form
        className="w-full flex items-center justify-center"
        onSubmit={handleSubmit}
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Log into your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="flex items-center text-sm">
              <p>Don't have an account? </p>
              <Link href={"/signup"}>
                <Button className="underline" variant="link" disabled={loading}>
                  Sign Up
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
