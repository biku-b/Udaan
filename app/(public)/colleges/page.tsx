"use client";

import React, { useState } from "react";
import { FilterPanel, FilterOptions } from "@/components/directory/FilterPanel";
import { CollegeCard } from "@/components/directory/CollegeCard";
import { EmptyState } from "@/components/directory/EmptyState";
import { DUMMY_COLLEGES } from "@/lib/dummy-data";

export default function CollegesPage() {
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  const colleges = DUMMY_COLLEGES.filter((col) => {
    if (
      activeFilters.province &&
      activeFilters.province.length > 0 &&
      !activeFilters.province.includes(col.province)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Colleges & Institutions
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-base">
          Find verified schools, colleges, and university campuses across Nepal.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel onFilterChange={(f) => setActiveFilters(f)} />
        </div>

        <div className="lg:col-span-3">
          {colleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {colleges.map((col) => (
                <CollegeCard key={col.id} {...col} />
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
