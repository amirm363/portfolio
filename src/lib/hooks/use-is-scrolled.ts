"use client";
import { useEffect, useState } from "react";

interface UseIsScrolledProps {
  threshold?: number;
}

export default function useIsScrolled({ threshold = 50 }: UseIsScrolledProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(0);

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
      if (offset < currentOffset) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      setCurrentOffset(offset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, currentOffset]);

  return { isScrolled, isScrollingUp };
}
