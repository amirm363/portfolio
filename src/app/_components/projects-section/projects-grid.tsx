import React from "react";
import { Project } from "@/lib/types/user.types";
import ProjectCard from "./project-card";

interface ProjectsGridProps {
  projects: Project[];
  className?: string;
}

export default function ProjectsGrid({
  projects,
  className,
}: ProjectsGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto ${
        className || ""
      }`}
    >
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}
