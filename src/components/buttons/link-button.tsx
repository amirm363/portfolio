import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn, ICON_MAP } from "@/lib/utils";

interface LinkButtonProps extends React.ComponentProps<typeof Button> {
  href: string;
  children?: React.ReactNode;
  icon?: keyof typeof ICON_MAP;
  variant?: "default" | "ghostBrand" | "brand" | "invertGhostBrand" | "ghost";
}

export default function LinkButton({
  href,
  children,
  icon,
  variant = "ghostBrand",
  ...props
}: LinkButtonProps) {
  const Icon = icon ? ICON_MAP[icon] : null;

  return (
    <Button
      asChild
      {...props}
      variant={variant}
      className={cn("transition-all duration-300", props.className)}
    >
      <Link href={href}>
        {Icon && (
          <Icon
            className={cn("w-4 h-4 ", children ? "mr-2" : "", props.className)}
          />
        )}
        {children}
      </Link>
    </Button>
  );
}
