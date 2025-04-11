import React from "react";

export default function ContactHeader() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-brand font-medium mb-2">Get in Touch</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Let&apos;s Start a <span className="text-brand">Conversation</span>
        </h2>
      </div>
      <p className="text-muted-foreground max-w-md">
        Have a project in mind or want to explore opportunities? I&apos;m always
        open to discuss new ideas and collaborations.
      </p>
    </div>
  );
}
