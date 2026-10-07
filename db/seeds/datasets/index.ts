import { hackathonDemo } from "./hackathon-demo";

export const seedDatasets = {
  demo: hackathonDemo,
};

export type SeedDatasetName = keyof typeof seedDatasets;