"use client";
import React from "react";
// import ThemeSwitcher from "./theme-switcher";
import { cn } from "@/lib/utils";
import useIsScrolled from "@/lib/hooks/use-is-scrolled";
import { NavigationLink } from "@/lib/types/user.types";
import MobileHeader from "./mobile-header";
import DesktopHeader from "./desktop-header";

interface HeaderProps {
  navigationLinks: NavigationLink[] | undefined;
}

export default function HeaderContainer({ navigationLinks }: HeaderProps) {
  const { isScrolled, isScrollingUp } = useIsScrolled({ threshold: 50 });

  return (
    <header
      className={cn(
        "fixed flex items-center md:justify-center top-0 left-0 right-0 z-50 bg-brand/10 backdrop-blur-sm px-4",
        "border-b border-border/20",
        "transition-all duration-200 ease-in-out",
        isScrolled
          ? "border border-border/80 h-16 top-7 left-14 right-14 max-w-3xl mx-auto  rounded-3xl px-4 "
          : "border-b  h-16 ",
        !isScrollingUp ? "-translate-y-[150%]" : "translate-y-0"
      )}
    >
      <DesktopHeader navigationLinks={navigationLinks || []} />
      <MobileHeader navigationLinks={navigationLinks || []} />
    </header>
  );
}
