import { PgDialect } from "drizzle-orm/pg-core";
import type { SQL } from "drizzle-orm";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/db/index", () => ({
  db: { select: vi.fn() },
}));

vi.mock("@/db/queries/hackathons", () => ({
  getActiveHackathon: vi.fn(),
}));

import { db } from "@/db/index";
import { getActiveHackathon } from "@/db/queries/hackathons";
import { getLunchBreaksForActiveHackathon } from "@/db/queries/lunch-breaks";

const mockSelect = vi.mocked(db.select);
const mockGetActiveHackathon = vi.mocked(getActiveHackathon);

const activeHackathon = {
  id: 7,
  name: "Test Hackathon",
  description: null,
  startDate: new Date("2026-10-20T09:00:00Z"),
  endDate: new Date("2026-10-22T18:00:00Z"),
  location: "Belgrade",
  status: "active" as const,
};

const lunchBreaks = [
  {
    id: 2,
    hackathonId: 7,
    title: "Second lunch",
    description: null,
    startTime: new Date("2026-10-21T13:00:00Z"),
    endTime: new Date("2026-10-21T14:00:00Z"),
    location: "Dining Hall",
  },
  {
    id: 1,
    hackathonId: 7,
    title: "First lunch",
    description: "Lunch break",
    startTime: new Date("2026-10-21T12:00:00Z"),
    endTime: new Date("2026-10-21T13:00:00Z"),
    location: "Dining Hall",
  },
];

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

describe("getLunchBreaksForActiveHackathon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when there is no active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(null as never);

    await expect(getLunchBreaksForActiveHackathon()).resolves.toBeNull();
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("filters by active hackathon and orders by start time", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const { where, orderBy } = mockQuery(lunchBreaks);

    await expect(getLunchBreaksForActiveHackathon()).resolves.toEqual(
      lunchBreaks,
    );

    const query = whereQuery(where);
    expect(query.sql).toContain('"lunch_breaks"."hackathon_id" =');
    expect(query.params).toEqual([activeHackathon.id]);
    expect(
      new PgDialect().sqlToQuery(orderBy.mock.calls[0][0] as SQL).sql,
    ).toContain('"lunch_breaks"."start_time" asc');
  });

  it("returns an empty array when the active hackathon has no lunch breaks", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    mockQuery([]);

    await expect(getLunchBreaksForActiveHackathon()).resolves.toEqual([]);
  });
});
