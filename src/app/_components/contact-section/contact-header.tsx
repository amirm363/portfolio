import React from "react";

export default function ContactHeader() {
  return (
    <div className="space-y-4">
      <h2 className="text-center text-4xl font-bold">Lets talk 😊</h2>
      <p className="text-center text-lg flex flex-col">
        <span className="font-bold">I&apos;ll love to hear from you.</span>{" "}
        <span className="">
          Please use the form below to get in{" "}
          <span className="font-bold text-brand">touch.</span>
        </span>
      </p>
    </div>
  );
}
