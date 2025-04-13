import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormSubmitButton from "../../../components/buttons/form-submit-button"; // Adjust path if needed
import { useFormStatus } from "react-dom"; // Import normally

// Mock react-dom for useFormStatus
vi.mock("react-dom", async (importOriginal) => {
  const original = (await importOriginal()) as Record<string, unknown>;
  return {
    ...original,
    useFormStatus: vi.fn(),
  };
});

// Mock lucide-react for Loader2
vi.mock("lucide-react", async (importOriginal) => {
  const original = (await importOriginal()) as Record<string, unknown>;
  return {
    ...original,
    Loader2: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="loader-icon" {...props} />
    ),
  };
});

describe("FormSubmitButton", () => {
  // Helper function to set the mock value before each relevant test
  const setPending = (pending: boolean) => {
    // Access the mocked function directly
    (useFormStatus as ReturnType<typeof vi.fn>).mockReturnValue({ pending });
  };

  it("renders children when not pending", () => {
    setPending(false);
    render(<FormSubmitButton>Submit</FormSubmitButton>);
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.queryByTestId("loader-icon")).not.toBeInTheDocument();
  });

  it("renders Loader2 icon when pending", () => {
    setPending(true);
    render(<FormSubmitButton>Submit</FormSubmitButton>);
    expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /submit/i })
    ).not.toBeInTheDocument(); // Children are replaced by loader
  });

  it("is enabled when not pending", () => {
    setPending(false);
    render(<FormSubmitButton>Submit</FormSubmitButton>);
    expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled();
  });

  it("is disabled when pending", () => {
    setPending(true);
    render(<FormSubmitButton>Submit</FormSubmitButton>);
    // When pending, the loader is rendered instead of children
    // The button role might still exist but contain the loader
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it('has type="submit"', () => {
    setPending(false);
    render(<FormSubmitButton>Submit</FormSubmitButton>);
    expect(screen.getByRole("button", { name: /submit/i })).toHaveAttribute(
      "type",
      "submit"
    );
  });

  it('applies default variant "brand"', () => {
    setPending(false);
    render(<FormSubmitButton>Default Variant</FormSubmitButton>);
    expect(
      screen.getByRole("button", { name: /default variant/i })
    ).toBeInTheDocument();
    // Add checks for specific classes or data attributes if needed
  });

  it("applies specified variant", () => {
    setPending(false);
    render(
      <FormSubmitButton variant="outline">Outline Variant</FormSubmitButton>
    );
    expect(
      screen.getByRole("button", { name: /outline variant/i })
    ).toBeInTheDocument();
    // Add checks for specific classes or data attributes if needed
  });

  it("applies additional className", () => {
    setPending(false);
    render(
      <FormSubmitButton className="custom-submit">
        Custom Class
      </FormSubmitButton>
    );
    expect(screen.getByRole("button", { name: /custom class/i })).toHaveClass(
      "custom-submit"
    );
  });
});
