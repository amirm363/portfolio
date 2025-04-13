import { MenuIcon } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
import { NavigationLink } from "@/lib/types/user.types";
import MobileMenu from "./mobile-menu";

const ThemeSwitcher = dynamic(() => import("./theme-switcher"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
});

interface MobileHeaderProps {
  navigationLinks: NavigationLink[];
}

export default function MobileHeader({ navigationLinks }: MobileHeaderProps) {
  return (
    <div className="md:hidden flex items-center justify-between w-full">
      <MobileMenu navigationLinks={navigationLinks}>
        <MenuIcon className="cursor-pointer" />
      </MobileMenu>
      <ThemeSwitcher />
    </div>
  );
}
