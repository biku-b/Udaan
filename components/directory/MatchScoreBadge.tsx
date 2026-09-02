"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface MatchScoreBadgeProps {
  score: number; // 0 to 100
  reasons?: string[];
  className?: string;
}

export function MatchScoreBadge({ score, reasons = [], className }: MatchScoreBadgeProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  // Clamp score
  const normalizedScore = Math.min(100, Math.max(0, Math.round(score)));

  let colorClasses = "text-success border-success bg-success/10";
  if (normalizedScore < 50) {
    colorClasses = "text-danger border-danger bg-danger/10";
  } else if (normalizedScore < 75) {
    colorClasses = "text-warning border-warning bg-warning/10";
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowExplanation(!showExplanation)}
        className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer",
          colorClasses,
          className
        )}
        title="Click to see match breakdown"
      >
        <span className="text-sm font-extrabold">{normalizedScore}%</span>
        <span className="font-medium text-[10px] uppercase tracking-wider">Match</span>
        <svg className="w-3 h-3 ml-0.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {showExplanation && (
        <div className="absolute right-0 mt-2 w-64 p-3 bg-surface border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl z-20 text-xs">
          <div className="flex justify-between items-center mb-2 pb-1 border-b border-neutral-200 dark:border-neutral-800">
            <span className="font-bold text-foreground">Why this match?</span>
            <button
              onClick={() => setShowExplanation(false)}
              className="text-neutral-400 hover:text-foreground"
            >
              ✕
            </button>
          </div>
          {reasons.length > 0 ? (
            <ul className="space-y-1 text-neutral-600 dark:text-neutral-400">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className="text-success font-bold">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500 italic">Score calculated based on your profile preferences and eligibility rules.</p>
          )}
        </div>
      )}
    </div>
  );
}
