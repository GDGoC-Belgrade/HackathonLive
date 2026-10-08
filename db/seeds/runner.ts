import "dotenv/config";

import { db } from "../index";
import { hackathons, mentors } from "../schema";
import { seedDatasets, type SeedDatasetName } from "./datasets";
import { eq } from "drizzle-orm/sql/expressions/conditions";

const datasetName = process.argv[2] as SeedDatasetName | undefined;

if (!datasetName) {
  console.error("Missing seed dataset name.");
  console.error("Example: npm run db:seed -- demo");
  process.exit(1);
}

const dataset = seedDatasets[datasetName];

if (!dataset) {
  console.error(`Unknown seed dataset: ${datasetName}`);
  console.error(`Available datasets: ${Object.keys(seedDatasets).join(", ")}`);
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

  await db.delete(mentors).where(eq(mentors.hackathonId, hackathon.id));

  await db.insert(mentors).values(
    dataset.mentors.map((mentor) => ({
      ...mentor,
      hackathonId: hackathon.id,
    })),
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
