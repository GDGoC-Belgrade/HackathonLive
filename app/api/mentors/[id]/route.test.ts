import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/mentors/[id]/route";

vi.mock("@/db/queries/mentors", () => ({
  getActiveHackathonMentorById: vi.fn(),
}));

import { getActiveHackathonMentorById } from "@/db/queries/mentors";

const mockGetMentorById = vi.mocked(getActiveHackathonMentorById);

const mockMentor = {
  id: 1,
  hackathonId: 1,
  name: "Ana Anić",
  role: "Backend Engineer",
  company: "Acme",
  bio: "Node.js and Postgres",
  imageUrl: null,
  linkedinUrl: "https://www.linkedin.com/in/ana-anic",
  phoneNumber: null,
  email: "ana@example.com",
};

const mockMentorWithoutLinkedin = {
  ...mockMentor,
  id: 2,
  name: "Marko Marković",
  linkedinUrl: null,
};

function callGet(id: string) {
  return GET(new Request(`http://localhost/api/mentors/${id}`), {
    params: Promise.resolve({ id }),
  });
}

describe("GET /api/mentors/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("returns mentor for valid id", async () => {
    mockGetMentorById.mockResolvedValue({ mentor: mockMentor });

    const response = await callGet("1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockMentor);
    expect(mockGetMentorById).toHaveBeenCalledWith(1);
  });

  it("returns linkedinUrl when mentor has one", async () => {
    mockGetMentorById.mockResolvedValue({ mentor: mockMentor });

    const response = await callGet("1");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.linkedinUrl).toBe("https://www.linkedin.com/in/ana-anic");
  });

  it("returns linkedinUrl as null when mentor has none", async () => {
    mockGetMentorById.mockResolvedValue({ mentor: mockMentorWithoutLinkedin });

    const response = await callGet("2");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockMentorWithoutLinkedin);
    expect(data).toHaveProperty("linkedinUrl", null);
  });

  it("accepts the largest Postgres integer", async () => {
    mockGetMentorById.mockResolvedValue({ error: "MENTOR_NOT_FOUND" });

    const response = await callGet("2147483647");

    expect(response.status).toBe(404);
    expect(mockGetMentorById).toHaveBeenCalledWith(2147483647);
  });

  it.each([
    "abc",
    "0",
    "-1",
    "1.5",
    "1e2",
    "0x10",
    " 5",
    "",
    "2147483648",
    "99999999999",
  ])("returns 400 for invalid id %j", async (id) => {
    const response = await callGet(id);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: {
        code: "INVALID_MENTOR_ID",
        message: "Invalid mentor ID",
      },
    });
    expect(mockGetMentorById).not.toHaveBeenCalled();
  });

  it("returns 404 when mentor does not exist", async () => {
    mockGetMentorById.mockResolvedValue({ error: "MENTOR_NOT_FOUND" });

    const response = await callGet("999");
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({
      error: {
        code: "MENTOR_NOT_FOUND",
        message: "Mentor not found",
      },
    });
  });

  it("returns 404 when mentor belongs to another hackathon", async () => {
    // The query filters by the active hackathon, so such a mentor is reported as not found
    mockGetMentorById.mockResolvedValue({ error: "MENTOR_NOT_FOUND" });

    const response = await callGet("2");
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({
      error: {
        code: "MENTOR_NOT_FOUND",
        message: "Mentor not found",
      },
    });
  });

  it("returns 404 when no active hackathon", async () => {
    mockGetMentorById.mockResolvedValue({ error: "NO_ACTIVE_HACKATHON" });

    const response = await callGet("1");
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({
      error: {
        code: "NO_ACTIVE_HACKATHON",
        message: "No active hackathon found",
      },
    });
  });

  it("returns 500 on unexpected error", async () => {
    mockGetMentorById.mockRejectedValue(new Error("DB connection failed"));

    const response = await callGet("1");
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
