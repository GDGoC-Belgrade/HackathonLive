import { NextResponse } from "next/server";

import { getLunchBreaksForActiveHackathon } from "@/db/queries/lunch-breaks";
import { apiError } from "@/lib/api-error";

export async function GET() {
  try {
    const lunchBreaks = await getLunchBreaksForActiveHackathon();

    if (lunchBreaks === null) {
      return apiError(
        "NO_ACTIVE_HACKATHON",
        "No active hackathon found",
        404,
      );
    }

    return NextResponse.json(lunchBreaks);
  } catch (error) {
    console.error("Failed to fetch lunch breaks:", error);

    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Internal server error",
      500,
    );
  }
}