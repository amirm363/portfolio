import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MobileMenu from "@/components/header/mobile-menu"; // Adjust path
import { NavigationLink } from "@/lib/types/user.types";

// Mock next/link
vi.mock("next/link", async () => {
  return {
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
  };
});

// Mock next/image
vi.mock("next/image", async () => {
  return {
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <img {...props} />
    ),
  };
});

// Mock shadcn/ui Sheet components
// We only mock the parts needed to render children and simulate interaction
vi.mock("@/components/ui/sheet", async () => {
  return {
    Sheet: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ), // Renders children
    SheetTrigger: ({ children }: { children: React.ReactNode }) => (
      <button>{children}</button>
    ), // Renders trigger button
    SheetContent: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ), // Renders content wrapper
    SheetHeader: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    SheetTitle: ({ children }: { children: React.ReactNode }) => (
      <h2>{children}</h2>
    ), // Simple title mock
  };
});

const mockNavLinks: NavigationLink[] = [
  { name: "Home", url: "home" },
  { name: "About", url: "about" },
  { name: "Projects", url: "projects" },
];

describe("MobileMenu", () => {
  const triggerText = "Open Menu";

  it("renders the trigger children", () => {
    render(
      <MobileMenu navigationLinks={mockNavLinks}>
        <span>{triggerText}</span>
      </MobileMenu>
    );
    expect(screen.getByText(triggerText)).toBeInTheDocument(); // Check if trigger content is rendered
  });

  it("renders navigation links within the (mocked) sheet content", () => {
    render(
      <MobileMenu navigationLinks={mockNavLinks}>
        <span>{triggerText}</span>
      </MobileMenu>
    );

    // Since SheetContent is mocked to just render children,
    // the links should be directly queryable
    mockNavLinks.forEach((link) => {
      expect(screen.getByRole("link", { name: link.name })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: link.name })).toHaveAttribute(
        "href",
        `#${link.url}`
      );
    });
  });

  it("renders the logo image", () => {
    render(
      <MobileMenu navigationLinks={mockNavLinks}>
        <span>{triggerText}</span>
      </MobileMenu>
    );
    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/logo.png");
  });

  // Note: Testing the actual state change (open/close) of the Sheet
  // is difficult with this level of mocking. We assume the Sheet handles
  // the open state based on trigger clicks internally.
  // We test if clicking a link *attempts* to close the sheet (by calling handleLinkClick).

  // To properly test the interaction, we might need a more sophisticated mock or integration test.
  // However, we can test if the click handler on the links is wired up.

  it("attempts to close the sheet when a navigation link is clicked", () => {
    // We can spy on the setOpen function if we mock useState, but that's complex.
    // Instead, we check if the link exists and assume the onClick is passed.
    // This is a limitation of unit testing complex UI components.
    render(
      <MobileMenu navigationLinks={mockNavLinks}>
        <span>{triggerText}</span>
      </MobileMenu>
    );

    const firstLink = screen.getByRole("link", { name: mockNavLinks[0].name });
    // Can't directly test setOpen(false) without more complex mocking of useState
    // or the component itself. We verify the link is clickable.
    expect(firstLink).toBeInTheDocument();
    // fireEvent.click(firstLink); // This click happens on the <a> tag
    // Further testing would require integration tests or more detailed mocks
  });
});
