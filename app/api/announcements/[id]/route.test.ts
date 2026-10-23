import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/announcements/[id]/route";

vi.mock("@/db/queries/announcements", () => ({
  getActiveAnnouncementById: vi.fn(),
}));

vi.mock("@/db/queries/hackathons", () => ({
  getActiveHackathon: vi.fn(),
}));

import { getActiveAnnouncementById } from "@/db/queries/announcements";
import { getActiveHackathon } from "@/db/queries/hackathons";

const mockGetActiveAnnouncementById = vi.mocked(getActiveAnnouncementById);
const mockGetActiveHackathon = vi.mocked(getActiveHackathon);

const request = new Request("http://localhost/api/announcements/1");

const mockHackathon = {
  id: 1,
  name: "Test Hackathon",
  description: "Test",
  startDate: new Date("2026-10-20T09:00:00Z"),
  endDate: new Date("2026-10-22T18:00:00Z"),
  location: "Belgrade",
  status: "active" as const,
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

async function getAnnouncementById(id: string) {
  return GET(request, { params: Promise.resolve({ id }) });
}

describe("GET /api/announcements/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetActiveHackathon.mockResolvedValue(mockHackathon);
  });

  it("returns an existing active announcement", async () => {
    mockGetActiveAnnouncementById.mockResolvedValue(mockAnnouncement);

    const response = await getAnnouncementById("1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      id: 1,
      hackathonId: 1,
      title: "Important announcement",
      message: "The event starts soon.",
      type: "important",
      createdAt: "2026-10-21T12:00:00.000Z",
      expiresAt: null,
    });
    expect(mockGetActiveAnnouncementById).toHaveBeenCalledWith(1);
  });

  it.each(["abc", "1.5", "1e2", "0", "-1", "2147483648"])(
    "returns 400 for invalid announcement id %s",
    async (id) => {
      const response = await getAnnouncementById(id);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({
        error: {
          code: "INVALID_ANNOUNCEMENT_ID",
          message: "Invalid announcement id",
        },
      });
      expect(mockGetActiveAnnouncementById).not.toHaveBeenCalled();
    },
  );

  it("returns 404 when the announcement does not exist", async () => {
    mockGetActiveAnnouncementById.mockResolvedValue(null);

    const response = await getAnnouncementById("999");
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({
      error: {
        code: "ANNOUNCEMENT_NOT_FOUND",
        message: "Announcement not found",
      },
    });
  });

  it("returns 404 when the announcement belongs to another hackathon", async () => {
    mockGetActiveAnnouncementById.mockResolvedValue(null);

    const response = await getAnnouncementById("2");
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({
      error: {
        code: "ANNOUNCEMENT_NOT_FOUND",
        message: "Announcement not found",
      },
    });
  });

  it("returns 404 when the announcement has expired", async () => {
    mockGetActiveAnnouncementById.mockResolvedValue(null);

    const response = await getAnnouncementById("3");
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({
      error: {
        code: "ANNOUNCEMENT_NOT_FOUND",
        message: "Announcement not found",
      },
    });
  });

  it("returns 500 when fetching the announcement fails", async () => {
    mockGetActiveAnnouncementById.mockRejectedValue(
      new Error("DB connection failed"),
    );

    const response = await getAnnouncementById("1");
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