import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { NavigationLink } from "@/lib/types/user.types";
import Link from "next/link";
import { Button } from "../ui/button";

interface MobileMenuProps {
  navigationLinks: NavigationLink[];
  children: React.ReactNode;
}

export default function MobileMenu({
  navigationLinks,
  children,
}: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side="left" className="py-10">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex flex-col gap-4">
          {navigationLinks.map((link) => (
            <Button variant="ghost" asChild key={link.url}>
              <Link href={`#${link.url}`} key={link.url}>
                {link.name}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
