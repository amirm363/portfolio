import React from "react";

interface ProjectsHeaderProps {
  title: string;
  subtitle: string;
}

function ProjectsHeader({ title, subtitle }: ProjectsHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

export default ProjectsHeader;
