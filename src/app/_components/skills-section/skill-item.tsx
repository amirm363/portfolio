import { Skill } from "@/lib/types/user.types";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

interface SkillItemProps {
  skill: Skill;
  className?: string;
}

export default function SkillItem({ skill, className }: SkillItemProps) {
  console.log("🚀 ~ skill-item.tsx:6 ~ SkillItem ~ skill:", skill);
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="w-[100px] h-[100px] min-w-[100px] min-h-[100px] flex items-center justify-center mb-2">
        <Image
          src={`/images/skills/${skill.icon}.svg`}
          alt={skill.name}
          width={100}
          height={100}
          className="drop-shadow-xl drop-shadow-brand/40 object-contain"
        />
      </div>
      <p className="relative text-sm font-medium">{skill.name}</p>
    </div>
  );
}
