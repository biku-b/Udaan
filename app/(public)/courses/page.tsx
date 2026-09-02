"use client";

import React, { useState } from "react";
import { FilterPanel, FilterOptions } from "@/components/directory/FilterPanel";
import { VerificationBadge } from "@/components/directory/VerificationBadge";
import { EmptyState } from "@/components/directory/EmptyState";
import { DUMMY_COURSES } from "@/lib/dummy-data";

export default function CoursesPage() {
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  const courses = DUMMY_COURSES.filter((course) => {
    if (
      activeFilters.educationLevel &&
      activeFilters.educationLevel.length > 0 &&
      !activeFilters.educationLevel.includes(course.level)
    ) {
      return false;
    }
    if (
      activeFilters.field &&
      activeFilters.field.length > 0 &&
      !activeFilters.field.includes(course.faculty)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Courses & Academic Programs
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-base">
          Explore degrees, diplomas, and higher secondary streams available in Nepal.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel onFilterChange={(f) => setActiveFilters(f)} />
        </div>

        <div className="lg:col-span-3">
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-surface rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                        {course.level}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">
                        {course.durationMonths / 12} Years ({course.durationMonths} Months)
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors cursor-pointer line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                      Faculty / Stream: <span className="font-semibold text-foreground">{course.faculty}</span>
                    </p>

                    <p className="text-xs text-neutral-500 mt-1">
                      Offered by <span className="font-bold text-foreground">{course.offeredByCount}</span> colleges in Nepal
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
                    <VerificationBadge status={course.verificationStatus} lastVerifiedAt={course.lastVerifiedAt} />
                  </div>
                </div>
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
