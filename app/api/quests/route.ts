import { NextResponse } from "next/server";

import { getActiveHackathonQuests } from "@/db/queries/quests";
import { apiError } from "@/lib/api-error";

export async function GET() {
  try {
    const quests = await getActiveHackathonQuests();

    if (quests === null) {
      return apiError(
        "NO_ACTIVE_HACKATHON",
        "No active hackathon found",
        404,
      );
    }

    return NextResponse.json(quests);
  } catch (error) {
    console.error("Failed to fetch quests:", error);

    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Internal server error",
      500,
    );
  }
}