import { PgDialect } from "drizzle-orm/pg-core";
import type { SQL } from "drizzle-orm";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getActiveAnnouncementById,
  getActiveAnnouncements,
  getLatestActiveAnnouncements,
} from "@/db/queries/announcements";

vi.mock("@/db/index", () => ({
  db: { select: vi.fn() },
}));

vi.mock("@/db/queries/hackathons", () => ({
  getActiveHackathon: vi.fn(),
}));

import { db } from "@/db/index";
import { getActiveHackathon } from "@/db/queries/hackathons";

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

const announcements = [
  {
    id: 2,
    hackathonId: 7,
    title: "Latest announcement",
    message: "The latest message",
    type: "important" as const,
    createdAt: new Date("2026-10-21T12:00:00Z"),
    expiresAt: null,
  },
  {
    id: 1,
    hackathonId: 7,
    title: "Older announcement",
    message: "The older message",
    type: "info" as const,
    createdAt: new Date("2026-10-21T10:00:00Z"),
    expiresAt: new Date("2026-10-22T12:00:00Z"),
  },
];

function mockQuery(rows: unknown[], withOrderLimit = false) {
  const limit = vi.fn().mockResolvedValue(rows);
  const orderBy = vi.fn().mockImplementation(() =>
    withOrderLimit ? { limit } : Promise.resolve(rows),
  );
  const where = vi.fn().mockReturnValue({ orderBy, limit });
  const from = vi.fn().mockReturnValue({ where });
  mockSelect.mockReturnValue({ from } as never);

  return { where, orderBy, limit };
}

function whereQuery(where: ReturnType<typeof vi.fn>) {
  return new PgDialect().sqlToQuery(where.mock.calls[0][0] as SQL);
}

function orderByQuery(orderBy: ReturnType<typeof vi.fn>) {
  return orderBy.mock.calls.map(([column]) =>
    new PgDialect().sqlToQuery(column as SQL).sql,
  );
}

describe("announcement queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when there is no active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(null as never);

    await expect(getActiveAnnouncements()).resolves.toBeNull();
    await expect(getLatestActiveAnnouncements()).resolves.toBeNull();
    await expect(getActiveAnnouncementById(1)).resolves.toBeNull();
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("filters announcements by hackathon and excludes expired rows", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const { where, orderBy } = mockQuery(announcements);

    await expect(getActiveAnnouncements()).resolves.toEqual(announcements);

    const query = whereQuery(where);
    expect(query.sql).toContain('"announcements"."hackathon_id" =');
    expect(query.sql).toContain('"announcements"."expires_at" is null');
    expect(query.sql).toContain('"announcements"."expires_at" >');
    expect(query.params[0]).toBe(activeHackathon.id);
    expect(Date.parse(String(query.params[1]))).not.toBeNaN();
    expect(orderByQuery(orderBy)).toEqual([
      '"announcements"."created_at" desc',
    ]);
  });

  it("returns an empty array when the active hackathon has no announcements", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    mockQuery([]);

    await expect(getActiveAnnouncements()).resolves.toEqual([]);
  });

  it("limits the latest active announcements to three results", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const { where, orderBy, limit } = mockQuery(announcements, true);

    await expect(getLatestActiveAnnouncements()).resolves.toEqual(announcements);

    expect(whereQuery(where).sql).toContain(
      '"announcements"."expires_at" >',
    );
    expect(orderByQuery(orderBy)).toEqual([
      '"announcements"."created_at" desc',
    ]);
    expect(limit).toHaveBeenCalledWith(3);
  });

  it("returns an empty array when there are no latest active announcements", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    mockQuery([], true);

    await expect(getLatestActiveAnnouncements()).resolves.toEqual([]);
  });

  it("filters announcement details by id, active hackathon, and expiration", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const { where, limit } = mockQuery([announcements[0]]);

    await expect(getActiveAnnouncementById(2)).resolves.toEqual(
      announcements[0],
    );

    const query = whereQuery(where);
    expect(query.sql).toContain('"announcements"."id" =');
    expect(query.sql).toContain('"announcements"."hackathon_id" =');
    expect(query.sql).toContain('"announcements"."expires_at" is null');
    expect(query.sql).toContain('"announcements"."expires_at" >');
    expect(query.params[0]).toBe(2);
    expect(query.params[1]).toBe(activeHackathon.id);
    expect(Date.parse(String(query.params[2]))).not.toBeNaN();
    expect(limit).toHaveBeenCalledWith(1);
  });

  it("returns null when an announcement is not found", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    mockQuery([]);

    await expect(getActiveAnnouncementById(999)).resolves.toBeNull();
  });
});
