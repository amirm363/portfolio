import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  children: React.ReactNode;
}

export default function FormInput({ label, name, children }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
