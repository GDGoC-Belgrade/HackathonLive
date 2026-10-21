import { NextResponse } from "next/server";

import { getActiveHackathonMentors } from "@/db/queries/mentors";
import { apiError } from "@/lib/api-error";

export async function GET() {
  try {
    const mentors = await getActiveHackathonMentors();

    if (mentors === null) {
      return apiError(
        "NO_ACTIVE_HACKATHON",
        "No active hackathon found",
        404,
      );
    }

    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Failed to fetch mentors:", error);

    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Internal server error",
      500,
    );
  }
}