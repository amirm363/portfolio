"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types/user.types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { useScrollAnimation } from "@/lib/hooks/use-scroll-animation";
interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const { name, description, image, url, technologies } = project;
  const { ref, isInView } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "group rounded-lg overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all duration-500 w-full max-w-[320px] opacity-0",
        className,
        isInView && "animate-in slide-in-from-bottom-25 fade-in-10 opacity-100"
      )}
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          {url && (
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </Link>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {technologies && (
          <div className="flex flex-wrap gap-1 pt-2">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
