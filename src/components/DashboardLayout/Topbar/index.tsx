"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const TopBar = () => {
  const pathname = usePathname();
  return (
    <nav className="ml-[300px] flex h-24 items-center justify-between border-[1px] border-gray-200 bg-white shadow-sm md:p-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <p>Aqib</p>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
