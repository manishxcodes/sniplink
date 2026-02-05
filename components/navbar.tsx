"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { getAuthStatus, signout } from "@/services/auth-service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await getAuthStatus();
      //console.log("navbar:isauth: ", response);
      setIsAuthenticated(response.authenticated || false);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    // Call your signout API
    await signout();
    setIsAuthenticated(false);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center fixed z-10 bg-neutral-100">
        <div className="max-w-5xl w-full flex items-center justify-between py-3 px-2">
          <h3 className="text-md tracking-tight">sniplink</h3>
          <div className="w-20 h-9" />{" "}
          {/* Placeholder to prevent layout shift */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center fixed">
      <div className="max-w-5xl w-full flex items-center justify-between py-3 px-2">
        <h3 className="text-md tracking-tight">sniplink</h3>
        {isAuthenticated ? (
          <Button size={"sm"} variant={"outline"} onClick={handleSignOut}>
            Sign Out
          </Button>
        ) : (
          <Link href={`/signin`}>
            <Button size={"sm"} variant={"outline"}>
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
