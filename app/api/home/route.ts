import { NextResponse } from "next/server";

import { getActiveHackathon } from "@/db/queries/hackathons";
import { getLatestActiveAnnouncements } from "@/db/queries/announcements";
import { getLunchBreaksForActiveHackathon } from "@/db/queries/lunch-breaks";
import { getNextUpcomingEvent } from "@/db/queries/schedule-events";

export async function GET() {
  try {
    const hackathon = await getActiveHackathon();

    if (!hackathon) {
      return NextResponse.json(
        { message: "No active hackathon found" },
        { status: 404 },
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
      announcements,
    });
  } catch (error) {
    console.error("Failed to fetch home data:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
