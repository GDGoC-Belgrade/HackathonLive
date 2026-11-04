import { describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/lunch-breaks/route";

vi.mock("@/db/queries/lunch-breaks", () => ({
  getLunchBreaksForActiveHackathon: vi.fn(),
}));

import { getLunchBreaksForActiveHackathon } from "@/db/queries/lunch-breaks";

const mockGetLunchBreaks = vi.mocked(getLunchBreaksForActiveHackathon);

const mockLunchBreaks = [
  {
    id: 1,
    hackathonId: 1,
    title: "Lunch",
    description: "Lunch break",
    startTime: new Date("2026-10-21T12:00:00Z"),
    endTime: new Date("2026-10-21T13:00:00Z"),
    location: "Dining Hall",
  },
];

describe("GET /api/lunch-breaks", () => {
  it("returns lunch breaks for the active hackathon", async () => {
    mockGetLunchBreaks.mockResolvedValue(mockLunchBreaks);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([
      {
        ...mockLunchBreaks[0],
        startTime: "2026-10-21T12:00:00.000Z",
        endTime: "2026-10-21T13:00:00.000Z",
      },
    ]);
  });

  it("returns an empty array when the active hackathon has no lunch breaks", async () => {
    mockGetLunchBreaks.mockResolvedValue([]);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([]);
  });

  it("returns 404 when there is no active hackathon", async () => {
    mockGetLunchBreaks.mockResolvedValue(null);

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

  it("returns 500 when fetching lunch breaks fails", async () => {
    mockGetLunchBreaks.mockRejectedValue(new Error("DB connection failed"));

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
});
