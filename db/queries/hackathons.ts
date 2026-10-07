import { eq } from "drizzle-orm";

import { db } from "../index";
import { hackathons } from "../schema";

export async function getActiveHackathon() {
  const [hackathon] = await db
    .select()
    .from(hackathons)
    .where(eq(hackathons.status, "active"))
    .limit(1);

  return hackathon ?? null;
}