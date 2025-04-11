import { cn } from "@/lib/utils";
import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  children,
  className,
}: SectionWrapperProps) {
  return (
    <div
      className={cn(
        "min-h-dvh flex items-center justify-center snap-start py-16",
        className
      )}
    >
      {children}
    </div>
  );
}
