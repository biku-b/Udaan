import React from "react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onResetFilters?: () => void;
  actionLabel?: string;
}

export function EmptyState({
  title = "No exact matches found",
  description = "We couldn't find any opportunities matching your current filters. Try adjusting your search criteria to see closest results.",
  onResetFilters,
  actionLabel = "Clear Filters",
}: EmptyStateProps) {
  return (
    <div className="bg-surface rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 text-center max-w-md mx-auto my-8">
      <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
        {description}
      </p>

      {onResetFilters && (
        <Button variant="outline" size="sm" onClick={onResetFilters}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
