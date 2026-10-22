import { PgDialect } from "drizzle-orm/pg-core";
import type { SQL } from "drizzle-orm";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getScheduleEventsForActiveHackathon } from "@/db/queries/schedule-events";

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
  name: "Test",
  description: null,
  startDate: new Date(),
  endDate: new Date(),
  location: "Test",
  status: "active" as const,
};

function makeEvent(overrides: Record<string, unknown> = {}) {
  return {
    id: 1,
    hackathonId: 7,
    title: "Opening Ceremony",
    description: "Kickoff",
    startTime: new Date("2026-10-10T09:00:00Z"),
    endTime: new Date("2026-10-10T10:00:00Z"),
    location: "Main Hall",
    type: "ceremony",
    ...overrides,
  };
}

function mockQueryChain(rows: unknown[]) {
  const orderBy = vi.fn().mockResolvedValue(rows);
  const where = vi.fn().mockReturnValue({ orderBy });
  const from = vi.fn().mockReturnValue({ where });
  mockSelect.mockReturnValue({ from } as never);

  return { from, where, orderBy };
}

function orderBySql(orderBy: ReturnType<typeof vi.fn>) {
  const columns = orderBy.mock.calls[0] as SQL[];
  return columns.map((column) => new PgDialect().sqlToQuery(column).sql);
}

function whereParams(where: ReturnType<typeof vi.fn>) {
  const condition = where.mock.calls[0][0] as SQL;
  return new PgDialect().sqlToQuery(condition).params;
}

describe("getScheduleEventsForActiveHackathon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  it("returns null when no active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(null as never);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result).toBeNull();
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("returns empty array when active hackathon has no events", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    mockQueryChain([]);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result).toEqual([]);
  });

  it("filters by active hackathon id and orders by startTime", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const { where, orderBy } = mockQueryChain([]);

    await getScheduleEventsForActiveHackathon();

    expect(whereParams(where)).toEqual([activeHackathon.id]);
    expect(orderBySql(orderBy)).toEqual([
      '"schedule_events"."start_time" asc',
      '"schedule_events"."id" asc',
    ]);
  });

  it("keeps the order returned by the query", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const earlier = makeEvent({ id: 1, title: "Earlier Event" });
    const later = makeEvent({
      id: 2,
      title: "Later Event",
      startTime: new Date("2026-10-10T14:00:00Z"),
      endTime: new Date("2026-10-10T15:00:00Z"),
    });
    mockQueryChain([earlier, later]);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result?.map((event) => event.id)).toEqual([1, 2]);
  });

  it("skips event that ends before it starts", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const valid = makeEvent({ id: 1 });
    const invalid = makeEvent({
      id: 2,
      startTime: new Date("2026-10-10T12:00:00Z"),
      endTime: new Date("2026-10-10T11:00:00Z"),
    });
    mockQueryChain([valid, invalid]);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result).toEqual([valid]);
    expect(console.warn).toHaveBeenCalledWith(
      "Skipping invalid schedule event (id: 2)",
    );
  });

  it("skips event with invalid date", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const valid = makeEvent({ id: 1 });
    const invalid = makeEvent({ id: 2, startTime: new Date("not a date") });
    mockQueryChain([valid, invalid]);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result).toEqual([valid]);
  });

  it("skips event with empty title", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const valid = makeEvent({ id: 1 });
    const invalid = makeEvent({ id: 2, title: "   " });
    mockQueryChain([valid, invalid]);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result).toEqual([valid]);
  });

  it("skips event with unknown type", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const valid = makeEvent({ id: 1 });
    const invalid = makeEvent({ id: 2, type: "networking" });
    mockQueryChain([valid, invalid]);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result).toEqual([valid]);
  });

  it("keeps event with long title and missing description", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const event = makeEvent({ title: "A".repeat(255), description: null });
    mockQueryChain([event]);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result).toEqual([event]);
  });
});