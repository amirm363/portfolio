import React from "react";
import ProjectsGrid from "./projects-grid";
import { Project } from "@/lib/types/user.types";

interface ProjectsSectionProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

export default function ProjectsSection({
  projects,
  title = "My Projects",
  subtitle = "A showcase of my recent work and experiments",
}: ProjectsSectionProps) {
  return (
    <section className="min-h-dvh flex w-full flex-col items-center justify-center  ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
