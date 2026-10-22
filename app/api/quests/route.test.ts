import { describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/quests/route";

vi.mock("@/db/queries/quests", () => ({
  getActiveHackathonQuests: vi.fn(),
}));

import { getActiveHackathonQuests } from "@/db/queries/quests";

const mockGetQuests = vi.mocked(getActiveHackathonQuests);

const mockQuests = [
  {
    id: 1,
    title: "Selfie Squad",
    description: "Take a photo with another team.",
    category: "social",
    googleFormUrl: "https://docs.google.com/forms/d/e/abc/viewform",
  },
  {
    id: 2,
    title: "Bug Hunter",
    description: null,
    category: "technical",
    googleFormUrl: "https://forms.gle/xyz",
  },
];

describe("GET /api/quests", () => {
  it("returns quests for active hackathon", async () => {
    mockGetQuests.mockResolvedValue(mockQuests);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockQuests);
  });

  it("returns 404 when no active hackathon", async () => {
    mockGetQuests.mockResolvedValue(null);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({ message: "No active hackathon found" });
  });

  it("returns empty array when active hackathon has no quests", async () => {
    mockGetQuests.mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
  });

  it("returns 500 on unexpected error", async () => {
    mockGetQuests.mockRejectedValue(new Error("DB connection failed"));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ message: "Internal server error" });
  });
});