"use client";
import { useEffect, useState } from "react";

interface UseIsScrolledProps {
  threshold?: number;
}

export default function useIsScrolled({ threshold = 50 }: UseIsScrolledProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { isScrolled };
}
