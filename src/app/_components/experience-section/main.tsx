import React from "react";
import { Experience } from "@/lib/types/user.types";
import ExperienceTimeline from "./experience-timeline";

interface ExperienceSectionProps {
  experiences: Experience[];
  title?: string;
  subtitle?: string;
}

export default function ExperienceSection({
  experiences,
  title = "Work Experience",
  subtitle = "My professional journey and career milestones",
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="bg-muted/30 rounded-3xl flex items-center flex-col max-w-[95vw] pt-12"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-3 text-center">{title}</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ExperienceTimeline experiences={experiences} />
        </div>
      </div>
    </section>
  );
}
