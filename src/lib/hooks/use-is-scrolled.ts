"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Interface for the properties that can be passed to the useIsScrolled hook.
 */
interface UseIsScrolledProps {
  /**
   * The scroll threshold in pixels. Determines when the `isScrolled` state should be set to true.
   * Default is 50 pixels.
   */
  threshold?: number;
}

/**
 * Custom React hook that tracks the scroll position of the window.
 * It provides two states: `isScrolled` and `isScrollingUp`.
 *
 * @param {UseIsScrolledProps} {threshold?: number} - The properties for the hook.
 * @returns {Object} An object containing:
 *  - `isScrolled`: A boolean indicating if the window has been scrolled past the threshold.
 *  - `isScrollingUp`: A boolean indicating if the user is scrolling up.
 */
export default function useIsScrolled({
  threshold = 50
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

      // Update the scroll direction if the threshold is bigger than 5
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
