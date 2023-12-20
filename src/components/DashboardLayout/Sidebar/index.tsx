/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { BiBookAlt } from "react-icons/bi";
import { LINKS, LINK_ICON_STYLE } from "./constants";
import { cn } from "@/lib/utils";
import KanbanLogo from "src/assets/KanbanLogo.svg";
import Image from "next/image";

interface SidebarProps {
  isSidebarOpen?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen = true }) => {
  const pathname = usePathname();
  const DASHBOARD_ROUTE = "/";

  const checkIfLinkIsActive = (link: string) => {
    // @ts-ignore
    return (
      pathname === link || (pathname.includes(link) && link !== DASHBOARD_ROUTE)
    );
  };

  return (
    <div
      className={cn(
        "flex h-full w-full -translate-x-full flex-col overflow-hidden bg-white p-0 text-sm transition-all duration-100 ease-in-out",
        isSidebarOpen && "translate-x-0",
      )}
    >
      <div className="mt-8 pl-8">
        <Image src={KanbanLogo} alt="img" />
      </div>

      <div className="mt-[30px] flex h-full flex-col justify-between overflow-y-auto pl-4">
        <div>
          {LINKS.map((link, Idx) => {
            const SideBarIcon = link?.icon;
            return (
              <Link href={link.url} key={link.name}>
                <div
                  className={cn(
                    "duration-350 mb-0 flex cursor-pointer items-center justify-start gap-2 px-4 py-3 transition-all ease-in-out hover:bg-gray-200 hover:text-black md:justify-center xl:justify-start xl:rounded-lg xl:px-4 xl:py-2",
                    checkIfLinkIsActive(link.url) && "bg-brand text-white",
                    Idx !== LINKS.length - 1 && "mb-3",
                  )}
                >
                  <SideBarIcon style={LINK_ICON_STYLE} />
                  <span className="block font-medium capitalize">
                    {link.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <div />
        <div className="mb-7 flex items-center justify-center">
          <Link href="/dashboard"></Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
