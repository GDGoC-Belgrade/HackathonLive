import { PgDialect } from "drizzle-orm/pg-core";
import type { SQL } from "drizzle-orm";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getActiveHackathonMentorById,
  getActiveHackathonMentors,
  getMentorByIdAndHackathonId,
} from "@/db/queries/mentors";

// Replace the real db so tests never connect to the shared database
vi.mock("@/db/index", () => ({
  db: { select: vi.fn() },
}));

vi.mock("@/db/queries/hackathons", () => ({
  getActiveHackathon: vi.fn(),
}));

import { db } from "@/db/index";
import { getActiveHackathon } from "@/db/queries/hackathons";

const mockSelect = vi.mocked(db.select);
const mockGetActiveHackathon = vi.mocked(getActiveHackathon);

const activeHackathon = {
  id: 7,
  name: "Test",
  description: null,
  startDate: new Date(),
  endDate: new Date(),
  location: "Test",
  status: "active" as const,
};

const mockMentor = {
  id: 1,
  hackathonId: 7,
  name: "Ana Anić",
  role: "Backend Engineer",
  company: null,
  bio: null,
  imageUrl: null,
  linkedinUrl: "https://www.linkedin.com/in/ana-anic",
  phoneNumber: null,
  email: "ana@example.com",
};

// Builds the select().from().where() chain and returns the mocks for assertions
function mockQueryChain(rows: unknown[]) {
  const orderBy = vi.fn().mockResolvedValue(rows);
  const limit = vi.fn().mockResolvedValue(rows);
  const where = vi.fn().mockReturnValue({ orderBy, limit });
  const from = vi.fn().mockReturnValue({ where });
  mockSelect.mockReturnValue({ from } as never);

  return { from, where, orderBy, limit };
}

function whereParams(where: ReturnType<typeof vi.fn>) {
  const condition = where.mock.calls[0][0] as SQL;
  return new PgDialect().sqlToQuery(condition).params;
}

describe("getActiveHackathonMentors", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when no active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(null as never);

    const result = await getActiveHackathonMentors();

    expect(result).toBeNull();
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("returns empty array when active hackathon has no mentors", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    mockQueryChain([]);

    const result = await getActiveHackathonMentors();

    expect(result).toEqual([]);
  });

  it("filters by active hackathon and orders the result", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const { where, orderBy } = mockQueryChain([mockMentor]);

    const result = await getActiveHackathonMentors();

    expect(result).toEqual([mockMentor]);
    expect(whereParams(where)).toEqual([activeHackathon.id]);
    expect(orderBy).toHaveBeenCalled();
  });
});

describe("getMentorByIdAndHackathonId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns mentor when found", async () => {
    const { limit } = mockQueryChain([mockMentor]);

    const result = await getMentorByIdAndHackathonId(1, 7);

    expect(result).toEqual(mockMentor);
    expect(limit).toHaveBeenCalledWith(1);
  });

  it("returns null when no row matches", async () => {
    mockQueryChain([]);

    const result = await getMentorByIdAndHackathonId(1, 7);

    expect(result).toBeNull();
  });
});

describe("getActiveHackathonMentorById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns NO_ACTIVE_HACKATHON when no active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(null as never);

    const result = await getActiveHackathonMentorById(1);

    expect(result).toEqual({ error: "NO_ACTIVE_HACKATHON" });
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("returns MENTOR_NOT_FOUND when mentor does not exist", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    mockQueryChain([]);

    const result = await getActiveHackathonMentorById(999);

    expect(result).toEqual({ error: "MENTOR_NOT_FOUND" });
  });

  it("queries by mentor id and active hackathon id", async () => {
    // A mentor from another hackathon cannot match, because hackathon_id is part of the query
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    const { where } = mockQueryChain([]);

    await getActiveHackathonMentorById(1);

    expect(whereParams(where)).toEqual([1, activeHackathon.id]);
  });

  it("returns mentor when found in active hackathon", async () => {
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    mockQueryChain([mockMentor]);

    const result = await getActiveHackathonMentorById(1);

    expect(result).toEqual({ mentor: mockMentor });
  });

  it("returns mentor without LinkedIn with linkedinUrl as null", async () => {
    const mentorWithoutLinkedin = { ...mockMentor, linkedinUrl: null };
    mockGetActiveHackathon.mockResolvedValue(activeHackathon);
    mockQueryChain([mentorWithoutLinkedin]);

    const result = await getActiveHackathonMentorById(1);

    expect(result).toEqual({ mentor: mentorWithoutLinkedin });
  });
});
