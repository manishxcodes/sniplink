import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-10">
        Smarter Links for a Faster Web
      </h1>
      <p className="leading-7 mb-5">
        Shorten long URLs and take control of every link you share.
      </p>
      <Link href={"/signup"}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
