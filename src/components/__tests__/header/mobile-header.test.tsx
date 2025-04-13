import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MobileHeader from "@/components/header/mobile-header"; // Adjust path
import { NavigationLink } from "@/lib/types/user.types";

// Mock child components
vi.mock("@/components/header/mobile-menu", () => ({
  // Mock MobileMenu to render its children (the trigger)
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mobile-menu-mock">{children}</div>
  ),
}));

vi.mock("@/components/header/theme-switcher", () => ({
  default: () => <div data-testid="theme-switcher-mock" />,
}));

// Mock lucide-react MenuIcon
vi.mock("lucide-react", async (importOriginal) => {
  const original = (await importOriginal()) as Record<string, unknown>;
  return {
    ...original,
    MenuIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="menu-icon" {...props} />
    ),
  };
});

const mockNavLinks: NavigationLink[] = [
  { name: "Home", url: "home" },
  { name: "About", url: "about" },
];

describe("MobileHeader", () => {
  it("renders the MobileMenu wrapper with MenuIcon as trigger", () => {
    render(<MobileHeader navigationLinks={mockNavLinks} />);

    // Check if the mock MobileMenu component is rendered
    const mobileMenu = screen.getByTestId("mobile-menu-mock");
    expect(mobileMenu).toBeInTheDocument();

    // Check if the MenuIcon (which is a child of MobileMenu) is rendered inside it
    // Use querySelector on the container or a more specific query if needed
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
  });

  it("renders the ThemeSwitcher", () => {
    render(<MobileHeader navigationLinks={mockNavLinks} />);
    expect(screen.getByTestId("theme-switcher-mock")).toBeInTheDocument();
  });

  // Note: Testing the `navigationLinks` prop being passed requires
  // inspecting props passed to the mocked MobileMenu, which can be done
  // by refining the mock or using spies, but is often considered testing
  // implementation details. We primarily check that the components render.
});
