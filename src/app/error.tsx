"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-[0.3px] rounded-full bg-gradient-to-r from-brand to-brand/30 blur-md opacity-75"></div>
            <div className="relative bg-background p-4 rounded-full">
              <AlertCircle className="w-12 h-12 text-brand" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Oops Something went wrong!</h1>
          <p className="text-muted-foreground">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>

        <Button variant="brand" onClick={reset} className="mt-4">
          Try again
        </Button>
      </div>
    </div>
  );
}
