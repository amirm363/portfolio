import React from "react";
import ContactForm from "./contact-form";
import ContactHeader from "./contact-header";
import { ContactInfo } from "@/lib/types/user.types";

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

function ContactSection({ contactInfo }: ContactSectionProps) {
  console.log("🚀 ~ main.tsx:11 ~ ContactSection ~ contactInfo:", contactInfo);
  return (
    <div className="flex flex-col items-center justify-center container mx-auto space-y-10 max-w-[95vw]">
      <ContactHeader />
      <div className="flex justify-center items-center space-y-10 max-w-xl mx-auto bg-brand/10 rounded-xl p-6  w-full">
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactSection;
