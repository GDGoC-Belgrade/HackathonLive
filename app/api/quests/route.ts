import { NextResponse } from "next/server";

import { getActiveHackathonQuests } from "@/db/queries/quests";

export async function GET() {
  try {
    const quests = await getActiveHackathonQuests();

    if (quests === null) {
      return NextResponse.json(
        { message: "No active hackathon found" },
        { status: 404 },
      );
    }

    return NextResponse.json(quests);
  } catch (error) {
    console.error("Failed to fetch quests:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}