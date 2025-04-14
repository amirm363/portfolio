"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { NavigationLink } from "@/lib/types/user.types";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import("./theme-switcher"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
});

interface DesktopHeaderProps {
  navigationLinks: NavigationLink[];
}

function DesktopHeader({ navigationLinks }: DesktopHeaderProps) {
  return (
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
        {navigationLinks?.map((link, index) => (
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
  );
}

export default DesktopHeader;
