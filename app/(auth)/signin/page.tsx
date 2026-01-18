"use client";

import SigninForm from "@/components/signin-form";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const handleSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      <SigninForm onSuccess={handleSuccess} />
    </div>
  );
}
