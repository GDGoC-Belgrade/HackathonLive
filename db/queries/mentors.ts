import { asc, eq } from "drizzle-orm";
import { db } from "../index";
import { mentors } from "../schema";
import { getActiveHackathon } from "./hackathons";

export async function getActiveHackathonMentors() {
  const activeHackathon = await getActiveHackathon();

  if (!activeHackathon) {
    return null;
  }

  return db
    .select()
    .from(mentors)
    .where(eq(mentors.hackathonId, activeHackathon.id))
    .orderBy(asc(mentors.name));
}

export async function getMentorById(id: number) {
  const [mentor] = await db
    .select()
    .from(mentors)
    .where(eq(mentors.id, id))
    .limit(1);

  if (!mentor) {
    return null;
  }

  return mentor;
}
