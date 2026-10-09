import { NextResponse } from "next/server";

import { getScheduleEventsForActiveHackathon } from "@/db/queries/schedule-events";

export async function GET() {
  try {
    const events = await getScheduleEventsForActiveHackathon();

    if (!events) {
      return NextResponse.json(
        { message: "No active hackathon found" },
        { status: 404 }
      );
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch schedule events:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
