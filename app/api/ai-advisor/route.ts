import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface MatchingFilters {
  educationLevel?: string;
  field?: string;
  province?: string;
}

export interface AIAdvisorMatch {
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

export async function GET() {
  const opportunities = await prisma.opportunity.findMany({
    include: {
      source: {
        select: {
          organization: true,
          url: true,
          sourceType: true,
          authorityLevel: true,
          reliability: true,
        },
      },
    },
  });

  const matches = opportunities
    .map((opp) => {
      const reasons: string[] = [];

      // Default reason when no filters
      if (Object.keys({}).length === 0) {
        reasons.push("Good match for your profile");
      }

      return {
        opportunity: {
          id: opp.id,
          title: opp.title,
          slug: opp.slug,
          type: opp.type,
          providerName: undefined,
          educationLevel: opp.educationLevel,
          field: opp.field,
          benefits: opp.benefits,
          deadline: opp.deadline,
          verificationStatus: opp.verificationStatus,
          lastVerifiedAt: opp.lastVerifiedAt,
          province: opp.province,
          sourceId: opp.sourceId,
          source: {
            organization: opp.source?.organization || "Unknown",
            url: opp.source?.url || "",
            sourceType: opp.source?.sourceType || "OTHER",
            authorityLevel: opp.source?.authorityLevel,
            reliability: opp.source?.reliability,
          },
        },
        matchScore: 50,
        matchReasons: reasons,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return NextResponse.json(matches);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { filters } = body as { filters: MatchingFilters };

  if (!filters) {
    return NextResponse.json(
      { error: { message: "Filters are required" } },
      { status: 400 }
    );
  }

  const opportunities = await prisma.opportunity.findMany({
    include: {
      source: {
        select: {
          organization: true,
          url: true,
          sourceType: true,
          authorityLevel: true,
          reliability: true,
        },
      },
    },
  });

  const matches = opportunities
    .filter((opp) => {
      if (filters.educationLevel && opp.educationLevel !== filters.educationLevel) {
        return false;
      }
      if (filters.field && opp.field !== filters.field) {
        return false;
      }
      if (filters.province && opp.province !== filters.province) {
        return false;
      }
      return true;
    })
    .map((opp) => {
      const reasons: string[] = [];

      if (filters.educationLevel && opp.educationLevel === filters.educationLevel) {
        reasons.push("Matches your education level");
      }
      if (filters.field && opp.field === filters.field) {
        reasons.push("Matches your field of interest");
      }
      if (filters.province && opp.province === filters.province) {
        reasons.push("Available in your province");
      }

      // Default reason if no filters applied
      if (Object.keys(filters).length === 0) {
        reasons.push("Good match for your profile");
      }

      let score = 50;
      if (filters.educationLevel && opp.educationLevel === filters.educationLevel) {
        score += 20;
      }
      if (filters.field && opp.field === filters.field) {
        score += 25;
      }
      if (filters.province && opp.province === filters.province) {
        score += 15;
      }
      score = Math.min(100, score);

      return {
        opportunity: {
          id: opp.id,
          title: opp.title,
          slug: opp.slug,
          type: opp.type,
          providerName: undefined,
          educationLevel: opp.educationLevel,
          field: opp.field,
          benefits: opp.benefits,
          deadline: opp.deadline,
          verificationStatus: opp.verificationStatus,
          lastVerifiedAt: opp.lastVerifiedAt,
          province: opp.province,
          sourceId: opp.sourceId,
          source: {
            organization: opp.source?.organization || "Unknown",
            url: opp.source?.url || "",
            sourceType: opp.source?.sourceType || "OTHER",
            authorityLevel: opp.source?.authorityLevel,
            reliability: opp.source?.reliability,
          },
        },
        matchScore: score,
        matchReasons: reasons,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return NextResponse.json(matches);
}