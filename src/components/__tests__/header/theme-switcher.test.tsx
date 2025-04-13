import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ThemeSwitcher from "@/components/header/theme-switcher"; // Adjust path if needed
import { useTheme } from "next-themes";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

// Mock lucide-react icons
vi.mock("lucide-react", async (importOriginal) => {
  const original = (await importOriginal()) as Record<string, unknown>;
  return {
    ...original,
    SunIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="sun-icon" {...props} />
    ),
    MoonIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="moon-icon" {...props} />
    ),
  };
});

describe("ThemeSwitcher", () => {
  // Define mock function outside, but assign inside beforeEach/it
  let mockSetTheme: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Reset mocks before each test
    mockSetTheme = vi.fn();
    // Reset the useTheme mock implementation for each test
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: "light", // Default theme for tests
      setTheme: mockSetTheme,
    });
  });

  it("renders MoonIcon when theme is light", () => {
    render(<ThemeSwitcher />);
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("sun-icon")).not.toBeInTheDocument();
  });

  it("renders SunIcon when theme is dark", () => {
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
    });
    render(<ThemeSwitcher />);
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("moon-icon")).not.toBeInTheDocument();
  });

  it("calls setTheme to dark when clicked in light mode", () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme to light when clicked in dark mode", () => {
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
    });
    render(<ThemeSwitcher />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("has the correct aria-label", () => {
    render(<ThemeSwitcher />);
    expect(
      screen.getByRole("button", { name: /toggle theme/i })
    ).toBeInTheDocument();
  });
});
