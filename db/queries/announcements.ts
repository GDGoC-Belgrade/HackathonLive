import { and, desc, eq, gt, isNull, or } from "drizzle-orm";

import { db } from "../index";
import { announcements } from "../schema";
import { getActiveHackathon } from "./hackathons";


export async function getActiveAnnouncements() {
  const hackathon = await getActiveHackathon();

  if (!hackathon) {
    return null;
  }
  return db
  .select()
  .from(announcements)
  .where(
      and(
        eq(announcements.hackathonId, hackathon.id),
        or(
          isNull(announcements.expiresAt),
          gt(announcements.expiresAt, new Date()),
        ),
      ),
    )
    .orderBy(desc(announcements.createdAt));
}

  