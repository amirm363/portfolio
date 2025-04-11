"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
// import ThemeSwitcher from "./theme-switcher";
import { cn } from "@/lib/utils";
import useIsScrolled from "@/lib/hooks/use-is-scrolled";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import("./theme-switcher"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
});

export default function Header() {
  const { isScrolled } = useIsScrolled({ threshold: 50 });
  return (
    <header
      className={cn(
        "fixed flex items-center justify-center top-0 left-0 right-0 z-50 bg-brand/10 backdrop-blur-sm ",
        "border-b border-border/20",
        "transition-all duration-200 ease-in-out",
        isScrolled
          ? "border border-border/80 h-16 top-7 left-14 right-14 max-w-3xl mx-auto  rounded-3xl px-2 "
          : "border-b  h-16 "
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
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
          {Array.from({ length: 5 }).map((_, index) => (
            <a
              href="#"
              key={index}
              className="relative text-sm font-medium group  hover:-translate-y-1 transition-all duration-200 ease-in-out  rounded-full  py-2"
            >
              <div className="absolute -inset-1 rounded-full group-hover:bg-gradient-to-t from-brand/20 to-brand/10"></div>
              Test
            </a>
          ))}
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
