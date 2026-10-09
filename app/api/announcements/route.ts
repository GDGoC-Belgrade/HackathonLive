import { NextResponse } from "next/server";
import { getActiveAnnouncements } from "@/db/queries/announcements";

export async function GET() {
  try {
    const announcements = await getActiveAnnouncements();

    if (announcements === null) {
      return NextResponse.json(
        { message: "No active announcements found" },
        { status: 404 }
      );
    }
    return NextResponse.json(announcements);
    } catch (error) {
    console.error("Failed to fetch active announcements:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}