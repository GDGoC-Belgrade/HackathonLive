import { NextResponse } from "next/server";

import { getActiveHackathon } from "@/db/queries/hackathons";
import { getLatestActiveAnnouncements } from "@/db/queries/announcements";
import { getLunchBreaksForActiveHackathon } from "@/db/queries/lunch-breaks";
import { getNextUpcomingEvent } from "@/db/queries/schedule-events";
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

    const [upcomingEvent, lunchBreaks, announcements] = await Promise.all([
      getNextUpcomingEvent(hackathon.id),
      getLunchBreaksForActiveHackathon(),
      getLatestActiveAnnouncements(),
    ]);

    return NextResponse.json({
      hackathon,
      countdown: {
        targetTime: hackathon.endDate,
      },
      upcomingEvent,
      lunchBreaks,
      announcements: announcements ?? [],
    });
  } catch (error) {
    console.error("Failed to fetch home data:", error);

    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Internal server error",
      500,
    );
  }
}