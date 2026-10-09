import { eq } from "drizzle-orm";

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
  .where(eq(announcements.hackathonId, hackathon.id));
}

  