import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  children: React.ReactNode;
  error: string | undefined;
}

export default function FormInput({
  label,
  name,
  children,
  error,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
