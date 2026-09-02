"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FilterPanel, FilterOptions } from "@/components/directory/FilterPanel";
import { OpportunityCard } from "@/components/directory/OpportunityCard";
import { EmptyState } from "@/components/directory/EmptyState";
import { DUMMY_OPPORTUNITIES } from "@/lib/dummy-data";

export default function HomePage() {
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  const filteredOpportunities = DUMMY_OPPORTUNITIES.filter((opp) => {
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-surface border-b border-neutral-200 dark:border-neutral-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Nepal-First AI Education Navigator
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl leading-tight">
            Know your path. <br />
            <span className="text-primary">Find your opportunity.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Personalized, source-verified scholarships, admissions, colleges, and career pathways built specifically for Nepali students.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
            <Link
              href="/scholarships"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:bg-primary-dark transition-colors"
            >
              Explore Scholarships
            </Link>
            <Link
              href="/ai-advisor"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 font-semibold text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Ask AI Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Scholarships", href: "/scholarships", icon: "🎓", count: "120+ active" },
            { label: "Colleges", href: "/colleges", icon: "🏛️", count: "450+ verified" },
            { label: "Courses", href: "/courses", icon: "📚", count: "80+ programs" },
            { label: "Admissions", href: "/admissions", icon: "📝", count: "Open notices" },
            { label: "Career Paths", href: "/careers", icon: "🚀", count: "30+ pathways" },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="bg-surface p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all hover:shadow-md flex flex-col items-center text-center"
            >
              <span className="text-3xl mb-2">{item.icon}</span>
              <span className="font-bold text-foreground text-sm">{item.label}</span>
              <span className="text-[11px] text-neutral-500 font-medium mt-1">{item.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured / Directory Section */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Top Verified Opportunities</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Hand-verified scholarships and entrance notices with official source citations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={(f) => setActiveFilters(f)} />
          </div>

          <div className="lg:col-span-3">
            {filteredOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOpportunities.map((opp) => (
                  <OpportunityCard key={opp.id} {...opp} />
                ))}
              </div>
            ) : (
              <EmptyState onResetFilters={() => setActiveFilters({})} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
