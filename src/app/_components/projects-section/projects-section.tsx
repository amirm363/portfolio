import React from "react";
import ProjectsGrid from "./projects-grid";
import { Project } from "@/lib/types/user.types";
import ProjectsHeader from "./projects-header";
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
    <section
      id="projects"
      className="min-h-dvh flex w-full flex-col items-center justify-center  "
    >
      <div className="container mx-auto px-4">
        <ProjectsHeader title={title} subtitle={subtitle} />
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
