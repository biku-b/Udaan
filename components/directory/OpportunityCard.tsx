import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { VerificationBadge, VerificationStatus } from "@/components/directory/VerificationBadge";
import { DeadlinePill } from "@/components/directory/DeadlinePill";
import { MatchScoreBadge } from "@/components/directory/MatchScoreBadge";

export interface OpportunityCardProps {
  id: string;
  title: string;
  slug: string;
  type: "SCHOLARSHIP" | "ADMISSION";
  providerName?: string;
  educationLevel: string;
  field?: string;
  benefits?: string[];
  deadline?: string | Date | null;
  verificationStatus: VerificationStatus;
  lastVerifiedAt?: string | Date;
  matchScore?: number | null;
  matchReasons?: string[];
}

export function OpportunityCard({
  title,
  slug,
  type,
  providerName,
  educationLevel,
  field,
  benefits = [],
  deadline,
  verificationStatus,
  lastVerifiedAt,
  matchScore,
  matchReasons,
}: OpportunityCardProps) {
  const detailHref = type === "SCHOLARSHIP" ? `/scholarships/${slug}` : `/admissions/${slug}`;

  return (
    <div className="bg-surface rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="font-semibold text-[10px] tracking-wider uppercase">
              {type}
            </Badge>
            <Badge variant="default" className="text-neutral-600 dark:text-neutral-300">
              {educationLevel}
            </Badge>
            {field && (
              <span className="text-xs text-neutral-500 font-medium">
                • {field}
              </span>
            )}
          </div>
          {matchScore !== undefined && matchScore !== null && (
            <MatchScoreBadge score={matchScore} reasons={matchReasons} />
          )}
        </div>

        <Link href={detailHref} className="group">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {providerName && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 font-medium">
            {providerName}
          </p>
        )}

        {benefits.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {benefits.map((benefit, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-secondary/10 text-secondary border border-secondary/20"
              >
                {benefit}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between flex-wrap gap-2 text-xs">
        <VerificationBadge status={verificationStatus} lastVerifiedAt={lastVerifiedAt} />
        <DeadlinePill deadline={deadline} />
      </div>
    </div>
  );
}
