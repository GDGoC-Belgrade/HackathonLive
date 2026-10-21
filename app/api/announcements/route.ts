import { NextResponse } from "next/server";

import { getActiveAnnouncements } from "@/db/queries/announcements";
import { apiError } from "@/lib/api-error";

export async function GET() {
  try {
    const announcements = await getActiveAnnouncements();

    if (announcements === null) {           // 'null' znaci da nema aktivnog hakatona za koja bismo imali announcements, a [] bi
      return apiError(                      // zapravo predstavljao da nema announcement-a za hakaton koji je aktivan, tako da ce []
        "NO_ACTIVE_HACKATHON",              // biti potpuno validan response ukoliko zaista ne postoje announcement-i za taj hakaton
        "No active hackathon found",
        404,
      );
    }

    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Failed to fetch active announcements:", error);

    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Internal server error",
      500,
    );
  }
}