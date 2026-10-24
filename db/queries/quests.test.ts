import { describe, expect, it, vi } from "vitest";

vi.mock("@/db/index", () => ({ db: {} }));
vi.mock("@/db/queries/hackathons", () => ({ getActiveHackathon: vi.fn() }));

import { getActiveHackathon } from "@/db/queries/hackathons";
import { getActiveHackathonQuests, toValidQuest } from "@/db/queries/quests";

const validRow = {
  id: 1,
  title: "  Selfie Squad ",
  description: "  ",
  category: "social",
  googleFormUrl: "https://docs.google.com/forms/d/e/abc/viewform",
};

describe("toValidQuest", () => {
  it("trims fields and turns blank description into null", () => {
    expect(toValidQuest(validRow)).toEqual({
      ...validRow,
      title: "Selfie Squad",
      description: null,
    });
  });

  it("skips quest with blank title or category", () => {
    expect(toValidQuest({ ...validRow, title: "   " })).toBeNull();
    expect(toValidQuest({ ...validRow, category: "" })).toBeNull();
  });

  it("skips quest with invalid googleFormUrl", () => {
    expect(toValidQuest({ ...validRow, googleFormUrl: "" })).toBeNull();
    expect(
      toValidQuest({ ...validRow, googleFormUrl: "http://docs.google.com/forms/x" }),
    ).toBeNull();
    expect(
      toValidQuest({ ...validRow, googleFormUrl: "https://example.com/forms/x" }),
    ).toBeNull();
  });
});

describe("getActiveHackathonQuests", () => {
  it("returns null when no active hackathon", async () => {
    vi.mocked(getActiveHackathon).mockResolvedValue(null as never);

    expect(await getActiveHackathonQuests()).toBeNull();
  });
});