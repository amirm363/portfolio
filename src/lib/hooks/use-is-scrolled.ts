"use client";
import { useEffect, useRef, useState } from "react";

interface UseIsScrolledProps {
  threshold?: number;
}

export default function useIsScrolled({
  threshold = 50,
}: UseIsScrolledProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  // Refs for tracking scroll position
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      // Update isScrolled
      setIsScrolled(currentScrollY > threshold);

      // Update the scroll direction if the treshold is bigger than 5
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setIsScrollingUp(currentScrollY < lastScrollY.current);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateScroll();
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled, isScrollingUp };
}
