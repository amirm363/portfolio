"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that provides a ref and a boolean indicating if the element is in view.
 * 
 * This hook uses the Intersection Observer API to determine if a referenced element
 * is within the viewport. It is useful for triggering animations or lazy loading content
 * when the element becomes visible in the user's viewport.
 * 
 * @returns {Object} An object containing:
 * - `ref`: A React ref to be attached to the DOM element you want to observe.
 * - `isInView`: A boolean that is true if the element is in view, false otherwise.
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once the animation has played, we can disconnect the observer
          if (element) observer.unobserve(element);
        }
      },
      {
        root: null, // viewport
        threshold: 0.2, // 20% of the element must be visible
        rootMargin: "0px 0px -100px 0px", // negative bottom margin so animation starts before element is fully in view
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return { ref, isInView };
}
