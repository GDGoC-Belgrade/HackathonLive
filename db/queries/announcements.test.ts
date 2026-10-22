import { afterEach, describe, expect, it, vi } from "vitest";

import { db } from "@/db/index";
import { getActiveHackathon } from "@/db/queries/hackathons";
import {
  getActiveAnnouncementById,
  getActiveAnnouncements,
  getLatestActiveAnnouncements,
} from "@/db/queries/announcements";

vi.mock("@/db/queries/hackathons", () => ({
  getActiveHackathon: vi.fn(),
}));

const mockGetActiveHackathon = vi.mocked(getActiveHackathon);

const activeHackathon = {
  id: 1,
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
    hackathonId: 1,
    title: "Latest announcement",
    message: "The latest message",
    type: "important" as const,
    createdAt: new Date("2026-10-21T12:00:00Z"),
    expiresAt: null,
  },
  {
    id: 1,
    hackathonId: 1,
    title: "Older announcement",
    message: "The older message",
    type: "info" as const,
    createdAt: new Date("2026-10-21T10:00:00Z"),
    expiresAt: new Date("2026-10-22T12:00:00Z"),
  },
];

afterEach(() => {
  vi.restoreAllMocks();
  mockGetActiveHackathon.mockReset();
});

describe("announcement queries", () => {
  it("returns null when there is no active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(null as never);

    await expect(getActiveAnnouncements()).resolves.toBeNull();
    await expect(getLatestActiveAnnouncements()).resolves.toBeNull();
    await expect(getActiveAnnouncementById(1)).resolves.toBeNull();
  });

  it("returns active announcements ordered by newest first", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);

    const mockOrderBy = vi.fn().mockResolvedValue(announcements);
    const mockWhere = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
    const originalSelect = db.select;
    db.select = mockSelect as never;

    await expect(getActiveAnnouncements()).resolves.toEqual(announcements);
    expect(mockSelect).toHaveBeenCalledWith();
    expect(mockFrom).toHaveBeenCalled();
    expect(mockWhere).toHaveBeenCalled();
    expect(mockOrderBy).toHaveBeenCalled();

    db.select = originalSelect;
  });

  it("returns an empty array when the active hackathon has no announcements", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);

    const mockOrderBy = vi.fn().mockResolvedValue([]);
    const mockWhere = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
    const originalSelect = db.select;
    db.select = mockSelect as never;

    await expect(getActiveAnnouncements()).resolves.toEqual([]);

    db.select = originalSelect;
  });

  it("limits latest active announcements to three results", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);

    const mockLimit = vi.fn().mockResolvedValue(announcements);
    const mockOrderBy = vi.fn().mockReturnValue({ limit: mockLimit });
    const mockWhere = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
    const originalSelect = db.select;
    db.select = mockSelect as never;

    await expect(getLatestActiveAnnouncements()).resolves.toEqual(announcements);
    expect(mockOrderBy).toHaveBeenCalled();
    expect(mockLimit).toHaveBeenCalledWith(3);

    db.select = originalSelect;
  });

  it("returns an active announcement by id", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);

    const mockLimit = vi.fn().mockResolvedValue([announcements[0]]);
    const mockWhere = vi.fn().mockReturnValue({ limit: mockLimit });
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
    const originalSelect = db.select;
    db.select = mockSelect as never;

    await expect(getActiveAnnouncementById(2)).resolves.toEqual(announcements[0]);
    expect(mockLimit).toHaveBeenCalledWith(1);

    db.select = originalSelect;
  });

  it("returns null when an announcement is not found", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);

    const mockLimit = vi.fn().mockResolvedValue([]);
    const mockWhere = vi.fn().mockReturnValue({ limit: mockLimit });
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
    const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
    const originalSelect = db.select;
    db.select = mockSelect as never;

    await expect(getActiveAnnouncementById(999)).resolves.toBeNull();

    db.select = originalSelect;
  });
});