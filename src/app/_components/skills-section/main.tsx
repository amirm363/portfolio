"use client";
import React from "react";
import SkillItem from "./skill-item";
import { Skill } from "@/lib/types/user.types";
interface SkillsSectionProps {
  skills: Skill[];
}

function SkillsSection({ skills }: SkillsSectionProps) {
  // const { ref, isInView } = useScrollAnimation();
  return (
    <div
      // ref={ref}
      className="relative flex overflow-x-hidden container  "
    >
      {/* Fading gradient borders*/}
      <div className="absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-[100px] bg-gradient-to-l from-background to-transparent z-10"></div>

      {/* Marquee */}
      <div className="py-12 animate-marquee whitespace-nowrap flex gap-10">
        {skills.map((skill) => (
          <SkillItem key={`first-${skill.name}`} skill={skill} />
        ))}
      </div>
      {/* Marquee 2*/}
      <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex gap-10 ml-10">
        {skills.map((skill) => (
          <SkillItem key={`second-${skill.name}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}
export default SkillsSection;
