import { NextResponse } from "next/server";

import { getActiveHackathon } from "@/db/queries/hackathons";
import { apiError } from "@/lib/api-error";

export async function GET() {
  try {
    const hackathon = await getActiveHackathon();

    if (!hackathon) {
      return apiError(
        "NO_ACTIVE_HACKATHON",
        "No active hackathon found",
        404,
      );
    }

    return NextResponse.json(hackathon);
  } catch (error) {
    console.error("Failed to fetch active hackathon:", error);

    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Internal server error",
      500,
    );
  }
}