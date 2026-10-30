import "dotenv/config";

import { eq } from "drizzle-orm";

import { isValidGoogleFormUrl } from "../../lib/google-form-url";
import { db } from "../index";
import {
  announcements,
  hackathons,
  lunchBreaks,
  mentors,
  quests,
  scheduleEvents,
} from "../schema";
import { datasets, type SeedDatasetName } from "./datasets";

const datasetName = process.argv[2] as SeedDatasetName | undefined;

if (!datasetName) {
  console.error("Missing seed dataset name.");
  console.error("Example: npm run db:seed -- demo");
  process.exit(1);
}

const dataset = datasets[datasetName];

if (!dataset) {
  console.error(`Unknown seed dataset: ${datasetName}`);
  console.error(`Available datasets: ${Object.keys(datasets).join(", ")}`);
  process.exit(1);
}

const invalidQuests = dataset.quests.filter(
  (quest) => !isValidGoogleFormUrl(quest.googleFormUrl)
);

if (invalidQuests.length > 0) {
  console.error(
    `Invalid googleFormUrl for quests: ${invalidQuests
      .map((quest) => quest.title)
      .join(", ")}`
  );
  process.exit(1);
}
async function seed() {
  const [existing] = await db
    .select()
    .from(hackathons)
    .where(eq(hackathons.name, dataset.hackathon.name))
    .limit(1);

  const hackathon =
    existing ??
    (await db.insert(hackathons).values(dataset.hackathon).returning())[0];

  if (!hackathon) {
    throw new Error("Hackathon insert did not return a record.");
  }

  await db.delete(mentors).where(eq(mentors.hackathonId, hackathon.id));

  await db.insert(mentors).values(
    dataset.mentors.map((mentor) => ({
      ...mentor,
      hackathonId: hackathon.id,
    }))
  );

  await db
    .delete(scheduleEvents)
    .where(eq(scheduleEvents.hackathonId, hackathon.id));

  await db.insert(scheduleEvents).values(
    dataset.scheduleEvents.map((event) => ({
      ...event,
      hackathonId: hackathon.id,
    }))
  );

  await db
    .delete(announcements)
    .where(eq(announcements.hackathonId, hackathon.id));

  await db.insert(announcements).values(
    dataset.announcements.map((announcement) => ({
      ...announcement,
      hackathonId: hackathon.id,
    }))
  );

  await db
    .delete(lunchBreaks)
    .where(eq(lunchBreaks.hackathonId, hackathon.id));

  await db.insert(lunchBreaks).values(
    dataset.lunchBreaks.map((lunchBreak) => ({
      ...lunchBreak,
      hackathonId: hackathon.id,
    }))
  );

  await db
    .delete(quests)
    .where(eq(quests.hackathonId, hackathon.id));

  await db.insert(quests).values(
    dataset.quests.map((quest) => ({
      ...quest,
      hackathonId: hackathon.id,
    }))
  );

  console.log(`Seed "${datasetName}" completed successfully`);
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(`Seed "${datasetName}" failed:`, error);
    process.exit(1);
  });
