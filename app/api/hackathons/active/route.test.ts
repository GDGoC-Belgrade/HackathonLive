import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/hackathons/active/route";

vi.mock("@/db/queries/hackathons", () => ({
  getActiveHackathon: vi.fn(),
}));

import { getActiveHackathon } from "@/db/queries/hackathons";

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

describe("GET /api/hackathons/active", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      id: 7,
      name: "Test Hackathon",
      status: "active",
    });
  });

  it("returns 404 when there is no active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(null as never);

    const response = await GET();

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "NO_ACTIVE_HACKATHON",
        message: "No active hackathon found",
      },
    });
  });
});
