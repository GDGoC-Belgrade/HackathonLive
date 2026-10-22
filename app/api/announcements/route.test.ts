import { describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/announcements/route";

vi.mock("@/db/queries/announcements", () => ({
  getActiveAnnouncements: vi.fn(),
}));

import { getActiveAnnouncements } from "@/db/queries/announcements";

const mockGetActiveAnnouncements = vi.mocked(getActiveAnnouncements);

const mockAnnouncements = [
  {
    id: 1,
    hackathonId: 1,
    title: "Important announcement",
    message: "The event starts soon.",
    type: "important" as const,
    createdAt: new Date("2026-10-21T12:00:00Z"),
    expiresAt: null,
  },
  {
    id: 2,
    hackathonId: 1,
    title: "General announcement",
    message: "Lunch is served at noon.",
    type: "info" as const,
    createdAt: new Date("2026-10-21T10:00:00Z"),
    expiresAt: new Date("2026-10-22T12:00:00Z"),
  },
];

describe("GET /api/announcements", () => {
  it("returns active announcements", async () => {
    mockGetActiveAnnouncements.mockResolvedValue(mockAnnouncements);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0]).toMatchObject({
      id: 1,
      hackathonId: 1,
      title: "Important announcement",
      message: "The event starts soon.",
      type: "important",
      createdAt: "2026-10-21T12:00:00.000Z",
      expiresAt: null,
    });
    expect(data[1].id).toBe(2);
  });

  it("returns an empty array when there are no active announcements", async () => {
    mockGetActiveAnnouncements.mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
  });

  it("returns 404 when there is no active hackathon", async () => {
    mockGetActiveAnnouncements.mockResolvedValue(null);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({ message: "No active announcements found" });
  });

  it("returns 500 when fetching announcements fails", async () => {
    mockGetActiveAnnouncements.mockRejectedValue(
      new Error("DB connection failed"),
    );

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ message: "Internal server error" });
  });
});
