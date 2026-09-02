import React from "react";
import { cn } from "@/lib/utils";

interface DeadlinePillProps {
  deadline?: string | Date | null;
  className?: string;
}

export function DeadlinePill({ deadline, className }: DeadlinePillProps) {
  if (!deadline) {
    return (
      <span className={cn("inline-flex items-center text-xs text-neutral-500 font-medium", className)}>
        Rolling / Ongoing
      </span>
    );
  }

  const deadlineDate = new Date(deadline);
  const now = new Date();

  // Reset time portions for pure date comparison
  const dDate = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate());
  const nDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = dDate.getTime() - nDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (diffDays < 0) {
    return (
      <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400", className)}>
        Closed ({formatDate(deadlineDate)})
      </span>
    );
  }

  let styleClasses = "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-200"; // neutral default

  if (diffDays <= 1) {
    // Red inside 1 day
    styleClasses = "bg-danger/10 text-danger border-danger/20 font-semibold";
  } else if (diffDays <= 7) {
    // Amber inside 7 days
    styleClasses = "bg-warning/10 text-warning border-warning/20 font-semibold";
  }

  const getLabel = () => {
    if (diffDays === 0) return "Ends Today";
    if (diffDays === 1) return "Ends Tomorrow";
    if (diffDays <= 7) return `${diffDays} days left`;
    return `Deadline: ${formatDate(deadlineDate)}`;
  };

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium transition-colors", styleClasses, className)}>
      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {getLabel()}
    </span>
  );
}
