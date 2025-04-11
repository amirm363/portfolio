import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
interface FormSubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive"
    | "brand"
    | "ghostBrand"
    | "invertGhostBrand";
}

function FormSubmitButton({
  children,
  className,
  variant = "brand",
}: FormSubmitButtonProps) {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={status.pending}
      className={cn(className)}
      variant={variant}
    >
      {status.pending ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </Button>
  );
}

export default FormSubmitButton;
