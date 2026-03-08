"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  return (
    <div className="fixed z-10  bg-white/90  w-full top-0">
      <header className="w-full border-b h-[60px] flex items-center justify-end   border-gray-200">
        <div className="flex items-center px-4 sm:max-w-[95%] sm:px-8 justify-between">
          {/* Right side buttons */}
          <div className="flex items-center self-end flex-1 justify-end gap-4">
            <Link href={"/login"}>
              <Button
                variant="ghost"
                size="lg"
                className="text-black h-10 font-medium shadow-md rounded-sm border flex items-center py-2 gap-2"
              >
                Login
                <MoveRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href={"/login"}>
              <Button
                variant={"destructive"}
                className="bg-red-600 hover:bg-red-700 rounded-sm h-10   text-white font-medium py-2 px-6"
                size="lg"
              >
                Login to Build Core
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
