import { PgDialect } from "drizzle-orm/pg-core";
import type { SQL } from "drizzle-orm";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getActiveHackathon } from "@/db/queries/hackathons";

vi.mock("@/db/index", () => ({
  db: { select: vi.fn() },
}));

import { db } from "@/db/index";

const mockSelect = vi.mocked(db.select);

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
  const limit = vi.fn().mockResolvedValue(rows);
  const where = vi.fn().mockReturnValue({ limit });
  const from = vi.fn().mockReturnValue({ where });
  mockSelect.mockReturnValue({ from } as never);

  return { from, where, limit };
}

function whereQuery(where: ReturnType<typeof vi.fn>) {
  return new PgDialect().sqlToQuery(where.mock.calls[0][0] as SQL);
}

describe("getActiveHackathon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the active hackathon", async () => {
    const { limit } = mockQuery([activeHackathon]);

    await expect(getActiveHackathon()).resolves.toEqual(activeHackathon);

    expect(limit).toHaveBeenCalledWith(1);
  });

  it("returns null when there is no active hackathon", async () => {
    mockQuery([]);

    await expect(getActiveHackathon()).resolves.toBeNull();
  });

  it("filters by active status", async () => {
    const { where } = mockQuery([]);

    await getActiveHackathon();

    const query = whereQuery(where);
    expect(query.sql).toContain('"hackathons"."status" =');
    expect(query.params).toEqual(["active"]);
  });
});
