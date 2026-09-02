import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { VerificationBadge, VerificationStatus } from "@/components/directory/VerificationBadge";

export interface CollegeCardProps {
  id: string;
  name: string;
  slug: string;
  type: string; // COLLEGE, UNIVERSITY, SCHOOL
  district: string;
  province: string;
  affiliation?: string | null;
  hasScholarships?: boolean;
  verificationStatus: VerificationStatus;
  lastVerifiedAt?: string | Date;
}

export function CollegeCard({
  name,
  slug,
  type,
  district,
  province,
  affiliation,
  hasScholarships = false,
  verificationStatus,
  lastVerifiedAt,
}: CollegeCardProps) {
  return (
    <div className="bg-surface rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="outline" className="text-[10px] tracking-wider uppercase font-semibold">
            {type}
          </Badge>
          {hasScholarships && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded border border-secondary/20">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Scholarships Available
            </span>
          )}
        </div>

        <Link href={`/colleges/${slug}`} className="group">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        <p className="text-xs text-neutral-500 font-medium mt-1 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {district}, {province}
        </p>

        {affiliation && (
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
            Affiliated with <span className="font-semibold">{affiliation}</span>
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between flex-wrap gap-2">
        <VerificationBadge status={verificationStatus} lastVerifiedAt={lastVerifiedAt} />
        <Link
          href={`/colleges/${slug}`}
          className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-0.5"
        >
          View Details
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
