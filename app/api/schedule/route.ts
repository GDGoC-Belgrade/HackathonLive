import { NextResponse } from "next/server";

import { getScheduleEventsForActiveHackathon } from "@/db/queries/schedule-events";
import { apiError } from "@/lib/api-error";

export async function GET() {
  try {
    const events = await getScheduleEventsForActiveHackathon();

    if (events === null) {
      return apiError(
        "NO_ACTIVE_HACKATHON",
        "No active hackathon found",
        404,
      );
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch schedule events:", error);

    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Internal server error",
      500,
    );
  }
}