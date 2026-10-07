import "dotenv/config";

import { db } from "../index";
import { hackathons, scheduleEvents } from "../schema";
import { seedDatasets, type SeedDatasetName } from "./datasets";

const datasetName = process.argv[2] as SeedDatasetName | undefined;

if (!datasetName) {
  console.error("Missing seed dataset name.");
  console.error("Example: npm run db:seed -- demo");
  process.exit(1);
}

const dataset = seedDatasets[datasetName];

if (!dataset) {
  console.error(`Unknown seed dataset: ${datasetName}`);
  console.error(
    `Available datasets: ${Object.keys(seedDatasets).join(", ")}`
  );
  process.exit(1);
}

async function seed() {
  const [hackathon] = await db
    .insert(hackathons)
    .values(dataset.hackathon)
    .returning();

  if (!hackathon) {
    throw new Error("Hackathon insert did not return a record.");
  }

  await db.insert(scheduleEvents).values(
    dataset.scheduleEvents.map((event) => ({
      ...event,
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