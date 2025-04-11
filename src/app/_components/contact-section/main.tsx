import React from "react";
import ContactForm from "./contact-form";
import ContactHeader from "./contact-header";

function ContactSection() {
  return (
    <div
      id="contact"
      className="min-h-dvh flex flex-col items-center justify-center container mx-auto py-20 space-y-10"
    >
      <div className="space-y-10 max-w-xl mx-auto bg-brand/10 rounded-xl p-10">
        <ContactHeader />
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactSection;
