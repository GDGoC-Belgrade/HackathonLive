import { describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/schedule/route";

vi.mock("@/db/queries/schedule-events", () => ({
  getScheduleEventsForActiveHackathon: vi.fn(),
}));

import { getScheduleEventsForActiveHackathon } from "@/db/queries/schedule-events";

const mockGetScheduleEvents = vi.mocked(getScheduleEventsForActiveHackathon);

const mockEvents = [
  {
    id: 1,
    hackathonId: 1,
    title: "Opening Ceremony",
    description: "Kickoff",
    startTime: new Date("2026-10-10T09:00:00Z"),
    endTime: new Date("2026-10-10T10:00:00Z"),
    location: "Main Hall",
    type: "ceremony" as const,
  },
  {
    id: 2,
    hackathonId: 1,
    title: "Workshop",
    description: "Next.js",
    startTime: new Date("2026-10-10T11:00:00Z"),
    endTime: new Date("2026-10-10T12:30:00Z"),
    location: "Room A",
    type: "workshop" as const,
  },
];

describe("GET /api/schedule", () => {
  it("returns events for active hackathon", async () => {
    mockGetScheduleEvents.mockResolvedValue(mockEvents);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0]).toMatchObject({
      id: 1,
      title: "Opening Ceremony",
      description: "Kickoff",
      startTime: "2026-10-10T09:00:00.000Z",
      endTime: "2026-10-10T10:00:00.000Z",
      location: "Main Hall",
      type: "ceremony",
    });
  });

  it("returns 404 when no active hackathon", async () => {
    mockGetScheduleEvents.mockResolvedValue(null);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({
      error: {
        code: "NO_ACTIVE_HACKATHON",
        message: "No active hackathon found",
      },
    });
  });

  it("returns empty array when active hackathon has no events", async () => {
    mockGetScheduleEvents.mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
  });

  it("passes through events in the order returned by the query", async () => {
    const sortedEvents = [
      {
        id: 1,
        hackathonId: 1,
        title: "Earlier Event",
        description: null,
        startTime: new Date("2026-10-10T09:00:00Z"),
        endTime: new Date("2026-10-10T10:00:00Z"),
        location: "Main Hall",
        type: "ceremony" as const,
      },
      {
        id: 2,
        hackathonId: 1,
        title: "Later Event",
        description: null,
        startTime: new Date("2026-10-10T14:00:00Z"),
        endTime: new Date("2026-10-10T15:00:00Z"),
        location: "Room B",
        type: "workshop" as const,
      },
    ];

    mockGetScheduleEvents.mockResolvedValue(sortedEvents);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0].title).toBe("Earlier Event");
    expect(data[1].title).toBe("Later Event");
  });

  it("returns 500 on unexpected error", async () => {
    mockGetScheduleEvents.mockRejectedValue(new Error("DB connection failed"));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      },
    });
  });

  it("keeps the API contract for every event field", async () => {
    mockGetScheduleEvents.mockResolvedValue([
      {
        id: 3,
        hackathonId: 1,
        title: "Night Hacking",
        description: null,
        startTime: new Date("2026-10-10T23:00:00Z"),
        endTime: new Date("2026-10-11T01:00:00Z"),
        location: "Main Hall",
        type: "other" as const,
      },
    ]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([
      {
        id: 3,
        hackathonId: 1,
        title: "Night Hacking",
        description: null,
        startTime: "2026-10-10T23:00:00.000Z",
        endTime: "2026-10-11T01:00:00.000Z",
        location: "Main Hall",
        type: "other",
      },
    ]);
  });
});
