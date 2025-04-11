import { cn } from "@/lib/utils";
import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionWrapper({
  children,
  className,
  id,
}: SectionWrapperProps) {
  return (
    <div
      id={id}
      className={cn(
        "min-h-dvh flex items-center justify-center  py-16",
        className
      )}
    >
      {children}
    </div>
  );
}
