import { NextResponse } from "next/server";
import { getActiveHackathonMentorById } from "@/db/queries/mentors";

const MAX_POSTGRES_INT = 2147483647;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const mentorId = Number(id);

    // Digits only, so values like "1e2", "0x10" or " 5" are rejected
    if (
      !/^\d+$/.test(id) ||
      !Number.isInteger(mentorId) ||
      mentorId <= 0 ||
      mentorId > MAX_POSTGRES_INT
    ) {
      return NextResponse.json(
        { message: "Invalid mentor ID" },
        { status: 400 },
      );
    }

    const result = await getActiveHackathonMentorById(mentorId);

    if ("error" in result) {
      return NextResponse.json(
        {
          message:
            result.error === "NO_ACTIVE_HACKATHON"
              ? "No active hackathon found"
              : "Mentor not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(result.mentor);
  } catch (error) {
    console.error("Failed to fetch mentor:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
