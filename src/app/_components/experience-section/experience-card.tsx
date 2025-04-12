"use client";
import { Experience } from "@/lib/types/user.types";
import React from "react";
import { CalendarIcon, BriefcaseIcon } from "lucide-react";
import { useScrollAnimation } from "@/lib/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
interface ExperienceCardProps {
  experience: Experience;
  isLast?: boolean;
}

export default function ExperienceCard({
  experience,
  isLast = false,
}: ExperienceCardProps) {
  const { company, position, startDate, endDate, description } = experience;
  const { ref, isInView } = useScrollAnimation();

  // Format dates for display
  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const formattedEndDate =
    endDate === "Present"
      ? "Present"
      : new Date(endDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });

  return (
    <div
      ref={ref}
      className={cn(
        "relative pl-8 pb-12 transition-all duration-500 opacity-0",
        isInView && "animate-in slide-in-from-bottom-25 fade-in-10 opacity-100"
      )}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-3 top-7 bottom-0 w-0.5 bg-border" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground">
        <BriefcaseIcon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <h3 className="text-xl font-semibold">{company}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3" />
            <span>
              {formattedStartDate} - {formattedEndDate}
            </span>
          </div>
        </div>

        <p className="text-lg font-medium text-primary">{position}</p>

        {description && description.length > 0 && (
          <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
