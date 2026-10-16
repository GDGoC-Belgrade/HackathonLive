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
    .orderBy(desc(announcements.createdAt))
    .limit(3);
}

export async function getActiveAnnouncementById(id: number) {
  const hackathon = await getActiveHackathon();

  if (!hackathon) {
    return null;
  }

  const [announcement] = await db
    .select({
      id: announcements.id,
      title: announcements.title,
      message: announcements.message,
      type: announcements.type,
      createdAt: announcements.createdAt,
      expiresAt: announcements.expiresAt,
    })
    .from(announcements)
    .where(
      and(
        eq(announcements.id, id),
        eq(announcements.hackathonId, hackathon.id),
        or(
          isNull(announcements.expiresAt),
          gt(announcements.expiresAt, new Date()),
        ),
      ),
    )
    .limit(1);

  return announcement ?? null;
}