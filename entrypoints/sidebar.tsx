import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";
import { browser } from "wxt/browser";
import { MessageType } from "@/entrypoints/types.ts";
import links from "@/lib/links.ts";
import { User } from "lucide-react";

export enum SidebarType {
  "home" = "home",
  "profile" = "profile",
  "settings" = "settings",
}

export const sidebarTypeMap: Record<
  SidebarType,
  {
    title: string;
  }
> = {
  [SidebarType.home]: {
    title: "Home",
  },
  [SidebarType.settings]: {
    title: "Settings",
  },
  [SidebarType.profile]: {
    title: "Profile",
  },
};

const Sidebar = ({
  sideNav,
  closeContent,
}: {
  sideNav: (sidebarType: SidebarType) => void;
  closeContent?: () => void;
}) => {
  const [sidebarType, setSidebarType] = useState<SidebarType>(SidebarType.home);
  return (
    <aside className="absolute inset-y-0 right-0 z-10 flex w-14 flex-col border-r bg-background border-l-[1px]">
      {closeContent && (
        <a
          className="hover:cursor-pointer flex h-9 w-9 items-center justify-center  text-muted-foreground transition-colors hover:text-foreground ml-auto mr-auto"
          href="#"
          onClick={() => {
            closeContent();
          }}
        >
          <IoMdCloseCircle className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">close sidebar</span>
        </a>
      )}
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                className={`hover:cursor-pointer flex h-9 w-9 items-center justify-center  text-muted-foreground transition-colors ${sidebarType == SidebarType.home ? "rounded-full bg-primary text-lg font-semibold text-primary-foreground" : ""}`}
                href="#"
                onClick={() => {
                  setSidebarType(SidebarType.home);
                  sideNav(SidebarType.home);
                }}
              >
                <RiDashboardFill
                  className={`h-4 w-4 transition-all group-hover:scale-110`}
                />
                <span className="sr-only">Article Quiz</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Article Quiz</TooltipContent>
          </Tooltip>
          <a
            className={`hover:cursor-pointer flex h-9 w-9 items-center justify-center  text-muted-foreground transition-colors ${sidebarType == SidebarType.profile ? "rounded-full bg-primary text-lg font-semibold text-primary-foreground" : ""}`}
            href="#"
            onClick={async () => {
              await browser.runtime.sendMessage({
                messageType: MessageType.GO_TO_URL,
                content: links.PROFILE_ENDPOINT,
              });
            }}
          >
            <User className={`h-4 w-4 transition-all group-hover:scale-110`} />
            <span className="sr-only">Profile</span>
          </a>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                className={`hover:cursor-pointer flex h-9 w-9 items-center justify-center  text-muted-foreground transition-colors ${sidebarType == SidebarType.settings ? "rounded-full bg-primary text-lg font-semibold text-primary-foreground" : ""} `}
                href="#"
                onClick={() => {
                  setSidebarType(SidebarType.settings);
                  sideNav(SidebarType.settings);
                }}
              >
                <IoIosSettings className={`h-5 w-5`} />
                <span className="sr-only">Settings</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
