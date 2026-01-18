"use client";

import SignupForm from "@/components/signup-form";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const handleSuccess = () => {
    router.push("/signin");
  };

  return (
    <div>
      <SignupForm onSuccess={handleSuccess} />
    </div>
  );
}
