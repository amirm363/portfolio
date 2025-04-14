import LinkButton from "@/components/buttons/link-button";
import React from "react";

export default function ScrollButton() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block hover:scale-125 transition-all duration-300">
      <LinkButton
        variant="invertGhostBrand"
        size="icon"
        className="rounded-full"
        href="#experience"
        icon="ArrowDown"
      ></LinkButton>
    </div>
  );
}
