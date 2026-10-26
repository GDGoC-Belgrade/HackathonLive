import { PgDialect } from "drizzle-orm/pg-core";
import type { SQL } from "drizzle-orm";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/db/index", () => ({ db: { select: vi.fn() } }));
vi.mock("@/db/queries/hackathons", () => ({ getActiveHackathon: vi.fn() }));

import { db } from "@/db/index";
import { getActiveHackathon } from "@/db/queries/hackathons";
import {
  getActiveHackathonQuests,
  getQuestsByHackathonId,
  toValidQuest,
} from "@/db/queries/quests";

const mockSelect = vi.mocked(db.select);
const mockGetActiveHackathon = vi.mocked(getActiveHackathon);

const validRow = {
  id: 1,
  title: "  Selfie Squad ",
  description: "  ",
  category: "social",
  googleFormUrl: "https://docs.google.com/forms/d/e/abc/viewform",
};

const activeHackathon = {
  id: 7,
  name: "Test Hackathon",
  description: null,
  startDate: new Date("2026-10-20T09:00:00Z"),
  endDate: new Date("2026-10-22T18:00:00Z"),
  location: "Belgrade",
  status: "active" as const,
};

function mockQuery(rows: unknown[]) {
  const orderBy = vi.fn().mockResolvedValue(rows);
  const where = vi.fn().mockReturnValue({ orderBy });
  const from = vi.fn().mockReturnValue({ where });
  mockSelect.mockReturnValue({ from } as never);

  return { where, orderBy };
}

function whereQuery(where: ReturnType<typeof vi.fn>) {
  return new PgDialect().sqlToQuery(where.mock.calls[0][0] as SQL);
}

beforeEach(() => {
  vi.clearAllMocks();
});

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
    mockGetActiveHackathon.mockResolvedValue(null as never);

    expect(await getActiveHackathonQuests()).toBeNull();
  });

  it("returns quests for the active hackathon only", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const { where, orderBy } = mockQuery([validRow]);

    await expect(getActiveHackathonQuests()).resolves.toEqual([
      { ...validRow, title: "Selfie Squad", description: null },
    ]);

    const query = whereQuery(where);
    expect(query.sql).toContain('"quests"."hackathon_id" =');
    expect(query.params).toEqual([activeHackathon.id]);
    expect(orderBy).toHaveBeenCalled();
  });
});

describe("getQuestsByHackathonId", () => {
  it("filters by the requested hackathon and orders quests by id", async () => {
    const { where, orderBy } = mockQuery([validRow]);

    await expect(getQuestsByHackathonId(12)).resolves.toEqual([
      { ...validRow, title: "Selfie Squad", description: null },
    ]);

    const query = whereQuery(where);
    expect(query.sql).toContain('"quests"."hackathon_id" =');
    expect(query.params).toEqual([12]);
    expect(
      new PgDialect().sqlToQuery(orderBy.mock.calls[0][0] as SQL).sql,
    ).toContain('"quests"."id" asc');
  });
});