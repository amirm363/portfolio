import React from "react";
import { UserConfig } from "@/lib/types/user.types";
import HeroContent from "./hero-content";
import HeroImage from "./hero-image";
import ScrollButton from "./scroll-button";

interface HeroSectionProps {
  user: UserConfig;
}

export default function HeroSection({ user }: HeroSectionProps) {
  return (
    <div className="container mx-auto ">
      <div className="flex md:flex-row flex-col-reverse items-center justify-center gap-10">
        {/* Left side: Text content */}
        <HeroContent user={user} />
        {/* Right side: Image */}
        <HeroImage profilePicture={user.profilePicture} />
      </div>

      {/* Scroll indicator */}
      <ScrollButton />
    </div>
    // </section>
  );
}
