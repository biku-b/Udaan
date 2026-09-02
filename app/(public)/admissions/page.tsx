"use client";

import React, { useState } from "react";
import { FilterPanel, FilterOptions } from "@/components/directory/FilterPanel";
import { OpportunityCard } from "@/components/directory/OpportunityCard";
import { EmptyState } from "@/components/directory/EmptyState";
import { DUMMY_OPPORTUNITIES } from "@/lib/dummy-data";

export default function AdmissionsPage() {
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  const admissions = DUMMY_OPPORTUNITIES.filter(
    (item) => item.type === "ADMISSION"
  ).filter((opp) => {
    if (
      activeFilters.educationLevel &&
      activeFilters.educationLevel.length > 0 &&
      !activeFilters.educationLevel.includes(opp.educationLevel)
    ) {
      return false;
    }

    if (
      activeFilters.field &&
      activeFilters.field.length > 0 &&
      !activeFilters.field.includes(opp.field)
    ) {
      return false;
    }

    if (
      activeFilters.province &&
      activeFilters.province.length > 0 &&
      !activeFilters.province.includes(opp.province)
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Admissions & Entrance Notices
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-base">
          Track official application deadlines, entrance exams, and college intake notices.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel onFilterChange={(f) => setActiveFilters(f)} />
        </div>

        <div className="lg:col-span-3">
          {admissions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {admissions.map((opp) => (
                <OpportunityCard key={opp.id} {...opp} />
              ))}
            </div>
          ) : (
            <EmptyState onResetFilters={() => setActiveFilters({})} />
          )}
        </div>
      </div>
    </div>
  );
}
