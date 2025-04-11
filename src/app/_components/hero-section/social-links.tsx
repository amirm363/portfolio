import LinkButton from "@/components/buttons/link-button";
import { SocialLink } from "@/lib/types/user.types";
import React from "react";

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

function SocialLinks({ socialLinks }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-4 justify-center md:justify-start">
      {socialLinks.map((socialLink: SocialLink) => (
        <LinkButton
          key={socialLink.name}
          href={socialLink.url}
          icon={socialLink.icon}
        >
          {/* {socialLink.name} */}
        </LinkButton>
      ))}
    </div>
  );
}

export default SocialLinks;
