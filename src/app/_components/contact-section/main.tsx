import React from "react";
import ContactForm from "./contact-form";
import ContactHeader from "./contact-header";

function ContactSection() {
  return (
    <div className="flex flex-col items-center justify-center container mx-auto space-y-10 max-w-[95vw]">
      <ContactHeader />
      <div className="space-y-10 max-w-xl mx-auto bg-brand/10 rounded-xl p-10">
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactSection;
