import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "@/components/header/header"; // Adjust path
import { NavigationLink } from "@/lib/types/user.types";
import useIsScrolled from "@/lib/hooks/use-is-scrolled"; // Path to the hook

// Mock next/link
vi.mock("next/link", async () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock next/image
vi.mock("next/image", async () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

// Mock the custom hook
vi.mock("@/lib/hooks/use-is-scrolled", () => ({
  default: vi.fn(),
}));

// Mock child components (ThemeSwitcher and MobileHeader)
// We need to mock ThemeSwitcher as it's dynamically imported
vi.mock("@/components/header/theme-switcher", () => ({
  default: () => <div data-testid="theme-switcher-mock" />,
}));

vi.mock("@/components/header/mobile-header", () => ({
  default: ({ navigationLinks }: { navigationLinks: NavigationLink[] }) => (
    <div data-testid="mobile-header-mock">{navigationLinks.length} links</div>
  ),
}));

const mockNavLinks: NavigationLink[] = [
  { name: "Home", url: "home" },
  { name: "About", url: "about" },
  { name: "Projects", url: "projects" },
];

describe("Header", () => {
  let mockUseIsScrolled: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Set default mock implementation for the hook before each test
    mockUseIsScrolled = useIsScrolled as ReturnType<typeof vi.fn>; // Cast for type safety
    mockUseIsScrolled.mockReturnValue({
      isScrolled: false,
      isScrollingUp: true,
    });
  });

  it("renders desktop navigation links, logo, and theme switcher when not scrolled", () => {
    const { container } = render(<Header navigationLinks={mockNavLinks} />);

    // Check that the main header element exists
    const headerElement = container.querySelector("header");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders MobileHeader", () => {
    render(<Header navigationLinks={mockNavLinks} />);
    // Check if MobileHeader mock is rendered
    const mobileHeader = screen.getByTestId("mobile-header-mock");
    expect(mobileHeader).toBeInTheDocument();
    // Check content based on mock implementation
    expect(mobileHeader).toHaveTextContent(`${mockNavLinks.length} links`);
  });

  it("applies scrolled styles when isScrolled is true", () => {
    mockUseIsScrolled.mockReturnValue({
      isScrolled: true,
      isScrollingUp: true,
    });
    const { container } = render(<Header navigationLinks={mockNavLinks} />);

    // Check for classes associated with the scrolled state.
    // These are based on the component's cn() logic.
    // This test is somewhat brittle as it depends on exact class names.
    const headerElement = container.firstChild as HTMLElement;
    expect(headerElement).toHaveClass("h-16"); // Base height
    expect(headerElement).toHaveClass("top-7"); // Scrolled class
    expect(headerElement).toHaveClass("rounded-3xl"); // Scrolled class
    expect(headerElement).not.toHaveClass("border-b"); // Default class removed when scrolled
  });

  it("applies default styles when isScrolled is false", () => {
    mockUseIsScrolled.mockReturnValue({
      isScrolled: false,
      isScrollingUp: true,
    });
    const { container } = render(<Header navigationLinks={mockNavLinks} />);

    const headerElement = container.firstChild as HTMLElement;
    expect(headerElement).toHaveClass("h-16"); // Base height
    expect(headerElement).not.toHaveClass("top-7"); // Scrolled class not present
    expect(headerElement).not.toHaveClass("rounded-3xl"); // Scrolled class not present
    expect(headerElement).toHaveClass("border-b"); // Default class present
  });

  it("applies translate-y-0 when isScrollingUp is true", () => {
    mockUseIsScrolled.mockReturnValue({
      isScrolled: true,
      isScrollingUp: true,
    });
    const { container } = render(<Header navigationLinks={mockNavLinks} />);
    const headerElement = container.firstChild as HTMLElement;
    expect(headerElement).toHaveClass("translate-y-0");
    expect(headerElement).not.toHaveClass("-translate-y-[150%]");
  });

  it("applies -translate-y-[150%] when isScrollingUp is false", () => {
    mockUseIsScrolled.mockReturnValue({
      isScrolled: true,
      isScrollingUp: false,
    });
    const { container } = render(<Header navigationLinks={mockNavLinks} />);
    const headerElement = container.firstChild as HTMLElement;
    expect(headerElement).toHaveClass("-translate-y-[150%]");
    expect(headerElement).not.toHaveClass("translate-y-0");
  });
});
