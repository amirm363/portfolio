"use client";
import { useEffect, useRef, useState } from "react";

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
