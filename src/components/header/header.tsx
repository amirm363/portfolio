"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
// import ThemeSwitcher from "./theme-switcher";
import { cn } from "@/lib/utils";
import useIsScrolled from "@/lib/hooks/use-is-scrolled";
import dynamic from "next/dynamic";
import { UserConfig } from "@/lib/types/user.types";
import MobileHeader from "./mobile-header";

const ThemeSwitcher = dynamic(() => import("./theme-switcher"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
});

interface HeaderProps {
  user: UserConfig | undefined;
}

export default function Header({ user }: HeaderProps) {
  const { isScrolled } = useIsScrolled({ threshold: 50 });

  return (
    <header
      className={cn(
        "fixed flex items-center md:justify-center top-0 left-0 right-0 z-50 bg-brand/10 backdrop-blur-sm px-4",
        "border-b border-border/20",
        "transition-all duration-200 ease-in-out",
        isScrolled
          ? "border border-border/80 h-16 top-7 left-14 right-14 max-w-3xl mx-auto  rounded-3xl px-4 "
          : "border-b  h-16 "
      )}
    >
      <div className="container mx-auto md:flex justify-around items-center hidden ">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={52}
            height={52}
            className="rounded-full"
          />
        </Link>
        <div className="flex items-center gap-10 ">
          {user?.navigationLinks.map((link, index) => (
            <a
              href={`#${link.url}`}
              key={index}
              className="relative  hover:drop-shadow-xl hover:drop-shadow-brand/70 text-sm font-medium group  hover:-translate-y-1 transition-transform duration-200 ease-in-out  rounded-full  py-2"
            >
              {link.name}
            </a>
          ))}
        </div>
        <ThemeSwitcher />
      </div>

      <MobileHeader navigationLinks={user?.navigationLinks || []} />
    </header>
  );
}
