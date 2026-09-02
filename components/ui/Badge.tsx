import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "success" | "warning" | "danger" | "secondary";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors";

  const variantStyles = {
    default: "bg-surface text-foreground border border-neutral-200 dark:border-neutral-800",
    outline: "border border-neutral-300 dark:border-neutral-700 text-foreground",
    success: "bg-emerald-500/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    danger: "bg-danger/10 text-danger border border-danger/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
