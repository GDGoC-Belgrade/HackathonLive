import { NextResponse } from "next/server";

import { getActiveHackathon } from "@/db/queries/hackathons";
import { getNextUpcomingEvent } from "@/db/queries/schedule-events";
import { getLunchBreaksByHackathonId } from "@/db/queries/lunch-breaks";
import { getAnnouncementsByHackathonId } from "@/db/queries/announcements";

export async function GET() {
  try {
    const hackathon = await getActiveHackathon();

    if (!hackathon) {
      return NextResponse.json(
        { message: "No active hackathon found" },
        { status: 404 }
      );
    }

    const [upcomingEvent, lunchBreaks, announcements] = await Promise.all([
      getNextUpcomingEvent(hackathon.id),
      getLunchBreaksByHackathonId(hackathon.id),
      getAnnouncementsByHackathonId(hackathon.id),
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
      { status: 500 }
    );
  }
}