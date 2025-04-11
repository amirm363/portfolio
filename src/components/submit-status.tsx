"use client";

import React, { useState, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const statusVariants = cva(
  "flex items-center gap-2 p-4 text-sm rounded-lg transition-all",
  {
    variants: {
      status: {
        success:
          "bg-green-50 text-green-600 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
        error:
          "bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
        warning:
          "bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
      },
    },
    defaultVariants: {
      status: "success",
    },
  }
);

export interface SubmitStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {
  message: string;
  visible?: boolean;
  icon?: boolean;
}

export function SubmitStatus({
  className,
  status,
  message,
  visible = true,
  icon = true,
  ...props
}: SubmitStatusProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
    } else {
      // Add small delay before hiding to allow animation to complete
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const StatusIcon = React.useMemo(() => {
    switch (status) {
      case "success":
        return CheckCircle2;
      case "error":
        return XCircle;
      case "warning":
        return AlertCircle;
      default:
        return CheckCircle2;
    }
  }, [status]);

  if (!visible && !isVisible) return null;

  return (
    <div
      className={cn(
        "mt-2 w-full overflow-hidden transition-all duration-300",
        visible
          ? "max-h-24 opacity-100 animate-slide-down"
          : "max-h-0 opacity-0 animate-slide-up"
      )}
    >
      <div className={cn(statusVariants({ status, className }))} {...props}>
        {icon && (
          <StatusIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

export default SubmitStatus;
