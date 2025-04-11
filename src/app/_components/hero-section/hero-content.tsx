import { Button } from "@/components/ui/button";
import { UserConfig } from "@/lib/types/user.types";
import Link from "next/link";
import React from "react";
import SocialLinks from "./social-links";

interface HeroContentProps {
  user: UserConfig;
}

export default function HeroContent({ user }: HeroContentProps) {
  return (
    <div className="max-w-xl space-y-6 text-center md:text-left animate-in fade-in-50 slide-in-from-left-40 duration-700">
      <div className="space-y-3">
        <p className="text-primary font-medium">Hello, I&apos;m</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          {user.name}
        </h1>
        <h2 className="text-2xl md:text-3xl text-muted-foreground">
          Full Stack <span className="text-brand">Developer</span>
        </h2>
      </div>

      <p className="text-lg text-muted-foreground">
        Crafting responsive web applications with modern technologies. I
        specialize in building exceptional digital experiences with React,
        Next.js, and Node.js.
      </p>

      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Button variant="brand" size="lg" asChild>
          <Link href="#projects">View Projects</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="#contact">Contact Me</Link>
        </Button>
      </div>

      <SocialLinks socialLinks={user.socialLinks} />
    </div>
  );
}
