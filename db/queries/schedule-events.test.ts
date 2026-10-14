import { describe, expect, it, vi } from "vitest";

import { getScheduleEventsForActiveHackathon } from "@/db/queries/schedule-events";

vi.mock("@/db/queries/hackathons", () => ({
  getActiveHackathon: vi.fn(),
}));

import { getActiveHackathon } from "@/db/queries/hackathons";

const mockGetActiveHackathon = vi.mocked(getActiveHackathon);

describe("getScheduleEventsForActiveHackathon", () => {
  it("returns null when no active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(null as never);

    const result = await getScheduleEventsForActiveHackathon();

    expect(result).toBeNull();
  });

  it("queries with orderBy asc on startTime for active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue({
      id: 1,
      name: "Test",
      description: null,
      startDate: new Date(),
      endDate: new Date(),
      location: "Test",
      status: "active",
    });

    const mockOrderBy = vi.fn().mockResolvedValue([]);
    const mockWhere = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });

    const { db } = await import("@/db/index");
    const originalSelect = db.select;
    db.select = mockSelect as never;

    await getScheduleEventsForActiveHackathon();

    expect(mockSelect).toHaveBeenCalled();
    expect(mockFrom).toHaveBeenCalled();
    expect(mockWhere).toHaveBeenCalled();
    expect(mockOrderBy).toHaveBeenCalled();

    db.select = originalSelect;
  });
});
