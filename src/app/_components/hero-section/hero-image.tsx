import React from "react";
import Image from "next/image";
interface HeroImageProps {
  profilePicture: string;
}

export default function HeroImage({ profilePicture }: HeroImageProps) {
  return (
    <div className="relative animate-in fade-in-50 slide-in-from-bottom-40 duration-700">
      <div className="absolute rounded-full bg-gradient-to-r from-brand to-brand/30 blur-md opacity-75 w-[200px] h-[200px] md:w-96 md:h-96"></div>
      <Image
        src={profilePicture}
        alt="Amir Meisner - Full Stack Developer"
        width={200}
        height={200}
        quality={100}
        priority
        className="rounded-full relative md:w-96 md:h-96 object-cover"
      />
    </div>
  );
}
