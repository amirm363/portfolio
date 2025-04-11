import React from "react";
import { Experience } from "@/lib/types/user.types";
import ExperienceCard from "./experience-card";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  if (!experiences || experiences.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No experience to display.
      </p>
    );
  }

  return (
    <div className="py-6">
      {experiences.map((experience, index) => (
        <ExperienceCard
          key={`${experience.company}-${index}`}
          experience={experience}
          isLast={index === experiences.length - 1}
        />
      ))}
    </div>
  );
}
