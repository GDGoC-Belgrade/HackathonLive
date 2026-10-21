import { NextResponse } from "next/server";

import { getActiveHackathonMentorById } from "@/db/queries/mentors";
import { apiError } from "@/lib/api-error";

const MAX_POSTGRES_INT = 2147483647;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const mentorId = Number(id);

    // Digits only, so values like "1e2", "0x10" or " 5" are rejected.
    if (
      !/^\d+$/.test(id) ||
      !Number.isInteger(mentorId) ||
      mentorId <= 0 ||
      mentorId > MAX_POSTGRES_INT
    ) {
      return apiError(
        "INVALID_MENTOR_ID",
        "Invalid mentor ID",
        400,
      );
    }

    const result = await getActiveHackathonMentorById(mentorId);

    if ("error" in result) {
      if (result.error === "NO_ACTIVE_HACKATHON") {
        return apiError(
          "NO_ACTIVE_HACKATHON",
          "No active hackathon found",
          404,
        );
      }

      return apiError(
        "MENTOR_NOT_FOUND",
        "Mentor not found",
        404,
      );
    }

    return NextResponse.json(result.mentor);
  } catch (error) {
    console.error("Failed to fetch mentor:", error);

    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Internal server error",
      500,
    );
  }
}