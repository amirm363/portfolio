"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "../ui/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeSwitch}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
