import { NextResponse } from "next/server";

import { getLunchBreaksForActiveHackathon } from "@/db/queries/lunch-breaks";

export async function GET() {
  try {
    const lunchBreaks = await getLunchBreaksForActiveHackathon();

    return NextResponse.json(lunchBreaks);
  } catch (error) {
    console.error("Failed to fetch lunch breaks:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}