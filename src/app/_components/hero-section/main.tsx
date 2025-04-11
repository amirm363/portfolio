import React from "react";
import Image from "next/image";
import { UserConfig } from "@/lib/types/user.types";
import HeroContent from "./hero-content";
import LinkButton from "@/components/buttons/link-button";

interface HeroSectionProps {
  user: UserConfig;
}

export default function HeroSection({ user }: HeroSectionProps) {
  return (
    // <section className="min-h-dvh flex items-center justify-center py-20 ">
    <div className="container mx-auto ">
      <div className="flex md:flex-row flex-col-reverse items-center justify-center gap-10">
        {/* Left side: Text content */}
        <HeroContent user={user} />
        {/* Right side: Image */}
        <div className="relative animate-in fade-in-50 slide-in-from-bottom-40 duration-700">
          <div className="absolute rounded-full bg-gradient-to-r from-brand to-brand/30 blur-md opacity-75 w-[200px] h-[200px] md:w-96 md:h-96"></div>
          <Image
            src={user.profilePicture}
            alt="Amir Meisner - Full Stack Developer"
            width={200}
            height={200}
            quality={100}
            priority
            className="rounded-full relative md:w-96 md:h-96 object-cover"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block hover:scale-125 transition-all duration-300">
        <LinkButton
          variant="invertGhostBrand"
          size="icon"
          className="rounded-full"
          href="#experience"
          icon="ArrowDown"
        ></LinkButton>
      </div>
    </div>
    // </section>
  );
}
