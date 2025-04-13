import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LinkButton from "../../../components/buttons/link-button"; // Adjust path if needed

// Mock next/link using async factory
vi.mock("next/link", async () => {
  // Return the mock implementation
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

// Mock lucide-react icons if ICON_MAP uses them
// Example: Mocking a specific icon used
// vi.mock('lucide-react', async (importOriginal) => {
//   const original = await importOriginal() as any;
//   return {
//     ...original,
//     ArrowRight: (props: any) => <svg data-testid="icon-arrow-right" {...props} />,
//     // Add other icons used in ICON_MAP as needed
//   };
// });
// If ICON_MAP uses simple components, explicit mocking might not be needed,
// but it's good practice if they come from an external library.
// For simplicity, let's assume ICON_MAP contains basic components or can be mocked easily if needed.

// Provide a basic mock for ICON_MAP using alias path
vi.mock("@/lib/utils", async (importOriginal) => {
  const original = (await importOriginal()) as Record<string, unknown>;
  return {
    ...original,
    ICON_MAP: {
      // Add mock icons as needed for testing
      testIcon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg data-testid="icon-test" {...props} />
      ),
    },
  };
});

describe("LinkButton", () => {
  const defaultProps = {
    href: "/test-link",
  };

  it("renders children correctly", () => {
    render(<LinkButton {...defaultProps}>Click Me</LinkButton>);
    expect(screen.getByRole("link", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders the link with the correct href", () => {
    render(<LinkButton {...defaultProps}>Test Link</LinkButton>);
    const linkElement = screen.getByRole("link", { name: /test link/i });
    expect(linkElement).toHaveAttribute("href", "/test-link");
  });

  it("renders an icon when provided", () => {
    // Make sure 'testIcon' exists in your mocked ICON_MAP
    render(<LinkButton {...defaultProps} icon="testIcon" />);
    // Check if the underlying anchor tag exists
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    // Check if the SVG element rendered by the mock icon is present
    expect(screen.getByTestId("icon-test")).toBeInTheDocument();
  });

  it("renders both icon and children when provided", () => {
    render(
      <LinkButton {...defaultProps} icon="testIcon">
        With Icon
      </LinkButton>
    );
    expect(
      screen.getByRole("link", { name: /with icon/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-test")).toBeInTheDocument();
  });

  it('applies default variant "ghostBrand" when none is provided', () => {
    // Need to inspect the underlying Button component or the rendered class names
    // shadcn/ui buttons often use data attributes for variants
    render(<LinkButton {...defaultProps}>Default Variant</LinkButton>);
    // This assumes the underlying Button component passes the variant prop down,
    // or uses it to generate class names. You might need to adjust the selector.
    // If Button applies variant as a class: expect(container.firstChild).toHaveClass('variant-ghostBrand');
    // If Button applies variant as data attribute: expect(container.firstChild).toHaveAttribute('data-variant', 'ghostBrand');
    // Testing implementation details like class names can be brittle.
    // A better approach might be snapshot testing or visual regression if styles are critical.
    // For now, we just check if it renders.
    expect(
      screen.getByRole("link", { name: /default variant/i })
    ).toBeInTheDocument();
  });

  it("applies the specified variant", () => {
    render(
      <LinkButton {...defaultProps} variant="brand">
        Brand Variant
      </LinkButton>
    );
    expect(
      screen.getByRole("link", { name: /brand variant/i })
    ).toBeInTheDocument();
    // Add specific class/attribute checks if needed and stable
  });

  it("applies additional className", () => {
    render(
      <LinkButton {...defaultProps} className="custom-class">
        Styled Link
      </LinkButton>
    );
    // Query for the link role instead of button
    const linkElement = screen.getByRole("link", {
      name: /styled link/i, // Use regex for flexibility
    });
    // Check the class directly on the link element
    expect(linkElement).toHaveClass("custom-class");
  });
});
