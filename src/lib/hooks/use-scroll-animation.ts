"use client";
import { useEffect, useRef, useState } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once the animation has played, we can disconnect the observer
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        root: null, // viewport
        threshold: 0.2, // 20% of the element must be visible
        rootMargin: "0px 0px -100px 0px", // negative bottom margin so animation starts before element is fully in view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isInView };
}
