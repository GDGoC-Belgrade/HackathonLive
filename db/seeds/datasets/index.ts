import { demoDataset } from "./demo";

export const datasets = {
  demo: demoDataset,
};

export type SeedDatasetName = keyof typeof datasets;
