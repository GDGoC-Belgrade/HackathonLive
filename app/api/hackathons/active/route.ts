import { NextResponse } from "next/server";

import { getActiveHackathon } from "@/db/queries/hackathons";

export async function GET() {
  try {
    const hackathon = await getActiveHackathon();

    if (!hackathon) {
      return NextResponse.json(
        { message: "No active hackathon found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hackathon);
  } catch (error) {
    console.error("Failed to fetch active hackathon:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}