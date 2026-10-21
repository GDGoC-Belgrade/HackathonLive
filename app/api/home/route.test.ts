import { afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/home/route";

vi.mock("@/db/queries/hackathons", () => ({
  getActiveHackathon: vi.fn(),
}));

vi.mock("@/db/queries/announcements", () => ({
  getLatestActiveAnnouncements: vi.fn(),
}));

vi.mock("@/db/queries/lunch-breaks", () => ({
  getLunchBreaksForActiveHackathon: vi.fn(),
}));

vi.mock("@/db/queries/schedule-events", () => ({
  getNextUpcomingEvent: vi.fn(),
}));

import { getLatestActiveAnnouncements } from "@/db/queries/announcements";
import { getActiveHackathon } from "@/db/queries/hackathons";
import { getLunchBreaksForActiveHackathon } from "@/db/queries/lunch-breaks";
import { getNextUpcomingEvent } from "@/db/queries/schedule-events";

const mockGetActiveHackathon = vi.mocked(getActiveHackathon);
const mockGetLatestActiveAnnouncements = vi.mocked(
  getLatestActiveAnnouncements,
);
const mockGetLunchBreaks = vi.mocked(getLunchBreaksForActiveHackathon);
const mockGetNextUpcomingEvent = vi.mocked(getNextUpcomingEvent);

const mockHackathon = {
  id: 1,
  name: "Test Hackathon",
  description: "A test hackathon",
  startDate: new Date("2026-10-20T09:00:00Z"),
  endDate: new Date("2026-10-22T18:00:00Z"),
  location: "Belgrade",
  status: "active" as const,
};

const mockEvent = {
  id: 1,
  hackathonId: 1,
  title: "Opening Ceremony",
  description: "Kickoff",
  startTime: new Date("2026-10-21T13:00:00Z"),
  endTime: new Date("2026-10-21T14:00:00Z"),
  location: "Main Hall",
  type: "ceremony" as const,
};

const mockLunchBreak = {
  id: 1,
  hackathonId: 1,
  title: "Lunch",
  description: "Lunch break",
  startTime: new Date("2026-10-21T12:00:00Z"),
  endTime: new Date("2026-10-21T13:00:00Z"),
  location: "Dining Hall",
};

const mockAnnouncement = {
  id: 1,
  hackathonId: 1,
  title: "Important announcement",
  message: "The event starts soon.",
  type: "important" as const,
  createdAt: new Date("2026-10-21T12:00:00Z"),
  expiresAt: null,
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/home", () => {
  it("returns home data for the active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(mockHackathon);
    mockGetNextUpcomingEvent.mockResolvedValue(mockEvent);
    mockGetLunchBreaks.mockResolvedValue([mockLunchBreak]);
    mockGetLatestActiveAnnouncements.mockResolvedValue([mockAnnouncement]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      hackathon: {
        id: 1,
        name: "Test Hackathon",
        status: "active",
      },
      countdown: {
        targetTime: "2026-10-22T18:00:00.000Z",
      },
      upcomingEvent: {
        id: 1,
        title: "Opening Ceremony",
      },
      lunchBreaks: [
        {
          id: 1,
          title: "Lunch",
        },
      ],
      announcements: [
        {
          id: 1,
          title: "Important announcement",
        },
      ],
    });
    expect(mockGetNextUpcomingEvent).toHaveBeenCalledWith(1);
    expect(mockGetLunchBreaks).toHaveBeenCalledOnce();
    expect(mockGetLatestActiveAnnouncements).toHaveBeenCalledOnce();
  });

  it("returns empty values when all optional home sections have no data", async () => {
    mockGetActiveHackathon.mockResolvedValue(mockHackathon);
    mockGetNextUpcomingEvent.mockResolvedValue(null as never);
    mockGetLunchBreaks.mockResolvedValue([]);
    mockGetLatestActiveAnnouncements.mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.upcomingEvent).toBeNull();
    expect(data.lunchBreaks).toEqual([]);
    expect(data.announcements).toEqual([]);
  });

  it("normalizes missing announcements to an empty array", async () => {
    mockGetActiveHackathon.mockResolvedValue(mockHackathon);
    mockGetNextUpcomingEvent.mockResolvedValue(null as never);
    mockGetLunchBreaks.mockResolvedValue([]);
    mockGetLatestActiveAnnouncements.mockResolvedValue(null);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.announcements).toEqual([]);
  });

  it("returns 404 when there is no active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(null as never);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({ message: "No active hackathon found" });
    expect(mockGetNextUpcomingEvent).not.toHaveBeenCalled();
    expect(mockGetLunchBreaks).not.toHaveBeenCalled();
    expect(mockGetLatestActiveAnnouncements).not.toHaveBeenCalled();
  });

  it("returns 500 when fetching home data fails", async () => {
    mockGetActiveHackathon.mockRejectedValue(new Error("DB connection failed"));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ message: "Internal server error" });
  });

  it("returns 500 when an optional home query fails", async () => {
    mockGetActiveHackathon.mockResolvedValue(mockHackathon);
    mockGetNextUpcomingEvent.mockRejectedValue(new Error("DB connection failed"));
    mockGetLunchBreaks.mockResolvedValue([]);
    mockGetLatestActiveAnnouncements.mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ message: "Internal server error" });
  });
});
