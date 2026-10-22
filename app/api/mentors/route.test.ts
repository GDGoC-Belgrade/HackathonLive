import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/mentors/route";

vi.mock("@/db/queries/mentors", () => ({
  getActiveHackathonMentors: vi.fn(),
}));

import { getActiveHackathonMentors } from "@/db/queries/mentors";

const mockGetMentors = vi.mocked(getActiveHackathonMentors);

const mockMentors = [
  {
    id: 1,
    hackathonId: 1,
    name: "Ana Anić",
    role: "Backend Engineer",
    company: "Acme",
    bio: "Node.js and Postgres",
    imageUrl: null,
    phoneNumber: null,
    email: "ana@example.com",
  },
  {
    id: 2,
    hackathonId: 1,
    name: "Marko Marković",
    role: "Frontend Engineer",
    company: null,
    bio: null,
    imageUrl: "https://example.com/marko.png",
    phoneNumber: "+381601234567",
    email: "marko@example.com",
  },
];

describe("GET /api/mentors", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("returns mentors for active hackathon", async () => {
    mockGetMentors.mockResolvedValue(mockMentors);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockMentors);
  });

  it("returns empty array when active hackathon has no mentors", async () => {
    mockGetMentors.mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
  });

  it("returns 404 when no active hackathon", async () => {
    mockGetMentors.mockResolvedValue(null);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({ message: "No active hackathon found" });
  });

  it("returns 500 on unexpected error", async () => {
    mockGetMentors.mockRejectedValue(new Error("DB connection failed"));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ message: "Internal server error" });
  });
});
