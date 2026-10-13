import { NextResponse } from "next/server";
import { getMentorById } from "@/db/queries/mentors";

const MAX_POSTGRES_INT = 2147483647;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const mentorId = Number(id);

    if (!Number.isInteger(mentorId) || mentorId <= 0 || mentorId > MAX_POSTGRES_INT) {
      return NextResponse.json(
        { message: "Invalid mentor ID" },
        { status: 400 },
      );
    }

    const mentor = await getMentorById(mentorId);

    if (!mentor) {
      return NextResponse.json(
        { message: "Mentor not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(mentor);
  } catch (error) {
    console.error("Failed to fetch mentor:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
