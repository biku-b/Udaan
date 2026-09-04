"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MatchScoreBadge } from "@/components/directory/MatchScoreBadge";
import { DUMMY_OPPORTUNITIES } from "@/lib/dummy-data";

interface OpportunityMatch {
  opportunity: {
    id: string;
    title: string;
    slug: string;
    type: "SCHOLARSHIP" | "ADMISSION";
    providerName?: string;
    educationLevel: string;
    field?: string;
    benefits?: string[];
    deadline?: string | null;
    verificationStatus: string;
    lastVerifiedAt?: string;
    province: string;
    sourceId?: string;
    source: {
      organization: string;
      url: string;
      sourceType: string;
      authorityLevel?: number;
      reliability?: number;
    };
  };
  matchScore: number;
  matchReasons: string[];
}

interface FilterState {
  educationLevel?: string;
  field?: string;
  province?: string;
}

export default function AIAdvisor() {
  const [matches, setMatches] = useState<OpportunityMatch[]>([]);
  const [filter, setFilter] = useState<FilterState>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async (overrides: FilterState = {}) => {
    setLoading(true);
    try {
      const body = overrides && Object.keys(overrides).length > 0 ? JSON.stringify({ filters: overrides }) : undefined;
      const url = body ? "/api/ai-advisor" : "/api/ai-advisor";
      const res = body ? await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      }) : await fetch(url);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error("AI Advisor fetch error:", err);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    fetchMatches(filter);
  };

  const clearFilters = () => {
    setFilter({});
    fetchMatches();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AI Advisor</h1>

      {/* Filter Form */}
      <div className="bg-surface rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 mb-8">
        <h2 className="text-xl font-bold text-primary mb-4">Refine Your Search</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Education Level
            </label>
            <select
              value={filter.educationLevel || ""}
              onChange={(e) => setFilter({ ...filter, educationLevel: e.target.value || undefined })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Any level</option>
              <option value="SEE">SEE</option>
              <option value="PLUS2">+2 / Higher Secondary</option>
              <option value="DIPLOMA">Diploma</option>
              <option value="BACHELOR">Bachelor</option>
              <option value="MASTER">Master</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Field of Study
            </label>
            <select
              value={filter.field || ""}
              onChange={(e) => setFilter({ ...filter, field: e.target.value || undefined })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Any field</option>
              <option value="Science">Science</option>
              <option value="Management">Management</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Province
          </label>
          <select
            value={filter.province || ""}
            onChange={(e) => setFilter({ ...filter, province: e.target.value || undefined })}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Any province</option>
            <option value="Bagmati">Bagmati</option>
            <option value="Koshi">Koshi</option>
            <option value="Gandaki">Gandaki</option>
            <option value="Lumbini">Lumbini</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <Button variant="primary" className="w-full" onClick={applyFilters}>
          {Object.keys(filter).length > 0 ? "Apply Filters" : "Show All"}
        </Button>
        <Button variant="outline" className="w-full mt-2" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {/* Match Results */}
      <div className="space-y-6">
        {matches.length === 0 && (
          <p className="text-neutral-600 dark:text-neutral-400">
            No opportunities found. <a href="/scholarships">Browse all scholarships</a> or <a href="/admissions">admissions notices</a>.
          </p>
        )}

        {matches.map((match, idx) => (
          <div
            key={match.opportunity.id}
            className="bg-surface rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {match.opportunity.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {match.opportunity.type === "SCHOLARSHIP"
                    ? "Scholarship"
                    : "Admission Entrance"}
                </p>
              </div>

              <MatchScoreBadge
                score={match.matchScore}
                reasons={match.matchReasons}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}