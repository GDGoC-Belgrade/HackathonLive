import { PgDialect } from "drizzle-orm/pg-core";
import type { SQL } from "drizzle-orm";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getScheduleEventsForActiveHackathon,
  getNextUpcomingEvent,
} from "@/db/queries/schedule-events";

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

function whereSql(where: ReturnType<typeof vi.fn>) {
  const condition = where.mock.calls[0][0] as SQL;
  return new PgDialect().sqlToQuery(condition).sql;
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
    expect(whereSql(where)).toBe('"schedule_events"."hackathon_id" = $1');
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

  it("skips event with invalid endTime", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const valid = makeEvent({ id: 1 });
    const invalid = makeEvent({ id: 2, endTime: new Date("not a date") });
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

  it("keeps event that crosses midnight into the next day", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const overnight = makeEvent({
      id: 1,
      title: "Night Hacking",
      startTime: new Date("2026-10-10T23:00:00Z"),
      endTime: new Date("2026-10-11T01:00:00Z"),
    });
    mockQueryChain([overnight]);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result).toEqual([overnight]);
  });

  it("keeps valid events across multiple days in order", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const day1 = makeEvent({
      id: 1,
      startTime: new Date("2026-10-10T09:00:00Z"),
      endTime: new Date("2026-10-10T10:00:00Z"),
    });
    const invalidDay2 = makeEvent({
      id: 2,
      startTime: new Date("2026-10-11T12:00:00Z"),
      endTime: new Date("2026-10-11T11:00:00Z"),
    });
    const day2 = makeEvent({
      id: 3,
      startTime: new Date("2026-10-11T14:00:00Z"),
      endTime: new Date("2026-10-11T15:00:00Z"),
    });
    const day3 = makeEvent({
      id: 4,
      startTime: new Date("2026-10-12T16:00:00Z"),
      endTime: new Date("2026-10-12T18:00:00Z"),
    });
    mockQueryChain([day1, invalidDay2, day2, day3]);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result?.map((event) => event.id)).toEqual([1, 3, 4]);
  });

  it("keeps event where startTime equals endTime", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const deadline = makeEvent({
      id: 1,
      title: "Submission Deadline",
      type: "deadline",
      startTime: new Date("2026-10-12T14:30:00Z"),
      endTime: new Date("2026-10-12T14:30:00Z"),
    });
    mockQueryChain([deadline]);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result).toEqual([deadline]);
  });
});

function mockNextEventChain(rows: unknown[]) {
  const limit = vi.fn().mockResolvedValue(rows);
  const orderBy = vi.fn().mockReturnValue({ limit });
  const where = vi.fn().mockReturnValue({ orderBy });
  const from = vi.fn().mockReturnValue({ where });
  mockSelect.mockReturnValue({ from } as never);

  return { from, where, orderBy, limit };
}

describe("getNextUpcomingEvent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the first upcoming event", async () => {
    const event = makeEvent({ id: 3 });
    mockNextEventChain([event]);

    const result = await getNextUpcomingEvent(7);

    expect(result).toEqual(event);
  });

  it("returns null when there are no upcoming events", async () => {
    mockNextEventChain([]);

    const result = await getNextUpcomingEvent(7);

    expect(result).toBeNull();
  });

  it("orders by startTime, then id, and takes only one", async () => {
    const { orderBy, limit } = mockNextEventChain([]);

    await getNextUpcomingEvent(7);

    expect(orderBySql(orderBy)).toEqual([
      '"schedule_events"."start_time" asc',
      '"schedule_events"."id" asc',
    ]);
    expect(limit).toHaveBeenCalledWith(1);
  });

  it("filters by the given hackathon id and future start time", async () => {
    const { where } = mockNextEventChain([]);

    await getNextUpcomingEvent(7);

    const [hackathonId, now] = whereParams(where);
    expect(hackathonId).toBe(7);
    expect(new Date(now as string).getTime()).toBeLessThanOrEqual(Date.now());
  });
});
