import { NextResponse } from "next/server";
import { getActiveHackathonMentors } from "@/db/queries/mentors";

export async function GET() {
  try {
    const mentors = await getActiveHackathonMentors();

    if (!mentors) {
      return NextResponse.json(
        { message: "No active hackathon found" },
        { status: 404 },
      );
    }

    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Failed to fetch mentors:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
