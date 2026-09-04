import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const opportunity = await prisma.opportunity.findUnique({
      where: { id },
    });

    if (!opportunity) {
      return NextResponse.json(
        { error: { message: "Opportunity not found" } },
        { status: 404 }
      );
    }

    const saved = await prisma.opportunity.update({
      where: { id },
      data: { isSaved: !opportunity.isSaved },
    });

    return NextResponse.json({
      isSaved: saved.isSaved,
      message: saved.isSaved ? "Saved to your list" : "Removed from your list",
    });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json(
      { error: { message: "Something went wrong" } },
      { status: 500 }
    );
  }
}