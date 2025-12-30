import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-5xl w-full flex items-center justify-between py-3 px-2">
        <h3 className="text-md  tracking-tight ">sniplink</h3>
        <Link href={`/signin`}>
          <Button size={"sm"} variant={"outline"}>
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
