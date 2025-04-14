import React from "react";

interface ExperienceHeaderProps {
  title: string;
  subtitle: string;
}

export default function ExperienceHeader({
  title,
  subtitle,
}: ExperienceHeaderProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-3 text-center">{title}</h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
