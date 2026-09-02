import React from "react";
import { Badge } from "@/components/ui/Badge";

export type VerificationStatus =
  | "VERIFIED"
  | "SECONDARY_VERIFIED"
  | "REVIEW_REQUIRED"
  | "UNVERIFIED"
  | "EXPIRED";

interface VerificationBadgeProps {
  status: VerificationStatus;
  lastVerifiedAt?: string | Date;
  showDate?: boolean;
}

export function VerificationBadge({
  status,
  lastVerifiedAt,
  showDate = true,
}: VerificationBadgeProps) {
  const configMap = {
    VERIFIED: {
      label: "Verified",
      variant: "success" as const,
      icon: (
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    SECONDARY_VERIFIED: {
      label: "Secondary Verified",
      variant: "outline" as const,
      icon: (
        <svg className="w-3 h-3 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    REVIEW_REQUIRED: {
      label: "Review Required",
      variant: "warning" as const,
      icon: (
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    UNVERIFIED: {
      label: "Unverified",
      variant: "danger" as const,
      icon: (
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    EXPIRED: {
      label: "Expired",
      variant: "default" as const,
      icon: (
        <svg className="w-3 h-3 mr-1 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const config = configMap[status] || configMap.UNVERIFIED;

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <Badge variant={config.variant}>
        {config.icon}
        {config.label}
      </Badge>
      {showDate && lastVerifiedAt && (
        <span className="text-[10px] text-neutral-500 font-normal">
          Last verified: {formatDate(lastVerifiedAt)}
        </span>
      )}
    </div>
  );
}
