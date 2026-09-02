"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DUMMY_CAREERS } from "@/lib/dummy-data";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Career Paths & Guidance
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-base">
          Explore professional pathways in Nepal and the academic routes to get there.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DUMMY_CAREERS.map((career) => (
              <div
                key={career.id}
                className="bg-surface rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between hover:border-primary/30 transition-colors"
              >
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{career.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                    {career.overview}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2">
                      Key Subjects
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {career.relevantSubjects.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-[11px] text-neutral-600 dark:text-neutral-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2">
                      Academic Routes
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {career.topPrograms.map((p, i) => (
                        <span key={i} className="px-2 py-0.5 bg-primary/5 rounded text-[11px] text-primary font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
                  <Link href={`/careers/${career.slug}`}>
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View Full Pathway
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Not sure which path?
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
              Our AI Advisor can analyze your academic scores, interests, and goals to suggest the most viable career paths for you.
            </p>
            <Link href="/ai-advisor">
              <Button variant="primary" className="w-full">
                Talk to AI Advisor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
