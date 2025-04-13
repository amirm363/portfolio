import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { NavigationLink } from "@/lib/types/user.types";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

interface MobileMenuProps {
  navigationLinks: NavigationLink[];
  children: React.ReactNode;
}

export default function MobileMenu({
  navigationLinks,
  children,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side="left" className="py-10">
        <SheetHeader className="flex flex-col items-center justify-center gap-4 pt-0">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Link>
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          {navigationLinks.map((link) => (
            <Button
              variant="invertGhostBrand"
              key={link.url}
              onClick={handleLinkClick}
            >
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
