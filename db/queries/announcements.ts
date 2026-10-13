import { and, desc, eq, gt, isNull, or } from "drizzle-orm";

import { db } from "../index";
import { announcements } from "../schema";
import { getActiveHackathon } from "./hackathons";

export async function getAnnouncementsByHackathonId( // pomocna f-ja za active hackathon, desc order, zato sto zelimo prvo najnovija obavestenja
  hackathonId: number,
  limit = 3
) {
  return db
    .select()
    .from(announcements)
    .where(
      and(
        eq(announcements.hackathonId, hackathonId),
        or(
          isNull(announcements.expiresAt),
          gt(announcements.expiresAt, new Date())
        )
      )
    )
    .orderBy(desc(announcements.createdAt))
    .limit(limit);
}

export async function getActiveAnnouncements() {
  const hackathon = await getActiveHackathon();

  if (!hackathon) {
    return null;
  }

  return getAnnouncementsByHackathonId(hackathon.id);
}