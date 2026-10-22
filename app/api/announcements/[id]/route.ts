import { NextResponse } from "next/server";

import { getActiveAnnouncementById } from "@/db/queries/announcements";
import { getActiveHackathon } from "@/db/queries/hackathons";
import { apiError } from "@/lib/api-error";

const MAX_POSTGRES_INT = 2147483647;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!/^\d+$/.test(id)) {
      return apiError(
        "INVALID_ANNOUNCEMENT_ID",
        "Invalid announcement id",
        400,
      );
    }

    const announcementId = Number(id);

    if (
      !Number.isInteger(announcementId) ||
      announcementId <= 0 ||
      announcementId > MAX_POSTGRES_INT
    ) {
      return apiError(
        "INVALID_ANNOUNCEMENT_ID",
        "Invalid announcement id",
        400,
      );
    }

    const activeHackathon = await getActiveHackathon();

    if (!activeHackathon) {
      return apiError(
        "NO_ACTIVE_HACKATHON",
        "No active hackathon found",
        404,
      );
    }

    const announcement = await getActiveAnnouncementById(announcementId);

    if (!announcement) {
      return apiError(
        "ANNOUNCEMENT_NOT_FOUND",
        "Announcement not found",
        404,
      );
    }

    return NextResponse.json(announcement);
  } catch (error) {
    console.error("Error fetching announcement:", error);

    return apiError(
      "INTERNAL_SERVER_ERROR",
      "Internal server error",
      500,
    );
  }
}