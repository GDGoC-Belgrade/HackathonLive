import type { NewQuest } from "../../schema";

export const hackathonDemo = {
  hackathon: {
    name: "HackathonLive Demo",
    description: "Demo hackathon for local development",
    startDate: new Date("2026-10-10T08:00:00Z"),
    endDate: new Date("2026-10-12T18:00:00Z"),
    location: "Belgrade",
    status: "active" as const,
  },

   announcements: [
    {
      title: "Welcome to HackathonLive!",
      message: "Welcome everyone! The hackathon has officially started.",
      type: "important" as const,
      createdAt: new Date("2026-10-10T08:00:00Z"),
      expiresAt: new Date("2026-10-12T18:00:00Z"),
    },
    {
      title: "Registration is open",
      message: "Make sure your team is registered before the deadline.",
      type: "info" as const,
      createdAt: new Date("2026-10-10T08:00:00Z"),
      expiresAt: new Date("2026-10-12T18:00:00Z"),
    },
    {
      title: "Submission deadline",
      message: "Remember that all projects must be submitted before the hackathon ends.",
      type: "warning" as const,
      createdAt: new Date("2026-10-10T08:00:00Z"),
      expiresAt: new Date("2026-10-12T18:00:00Z"),
    },
  ],
  
  lunchBreaks: [
    {
      title: "Lunch Break - Day 1",
      description: "Lunch and networking",
      startTime: new Date("2026-10-10T11:30:00Z"),
      endTime: new Date("2026-10-10T12:30:00Z"),
      location: "Cafeteria",
    },
    {
      title: "Lunch Break - Day 2",
      description: "Lunch and mentor chat",
      startTime: new Date("2026-10-11T11:30:00Z"),
      endTime: new Date("2026-10-11T12:30:00Z"),
      location: "Cafeteria",
    },
    {
      title: "Lunch Break - Day 3",
      description: "Final day lunch",
      startTime: new Date("2026-10-12T11:30:00Z"),
      endTime: new Date("2026-10-12T12:30:00Z"),
      location: "Main Hall",
    },
  ],
  quests: [
    {
      title: "Selfie Squad",
      description:
        "Take a photo with another team wearing a different colored badge.",
      category: "social",
      googleFormUrl: "https://docs.google.com/forms/d/e/REPLACE_ME_1/viewform",
    },
    {
      title: "Caffeine Chat",
      description:
        "Grab a coffee with a mentor and ask about their favorite tech stack.",
      category: "networking",
      googleFormUrl: "https://docs.google.com/forms/d/e/REPLACE_ME_2/viewform",
    },
    {
      title: "Bug Hunter",
      description: "Find the hidden bug in the workshop demo code.",
      category: "technical",
      googleFormUrl: "https://docs.google.com/forms/d/e/REPLACE_ME_3/viewform",
    },
    {
      title: "Feedback Loop",
      description: "Submit feedback for the morning keynote session.",
      category: "feedback",
      googleFormUrl: "https://docs.google.com/forms/d/e/REPLACE_ME_4/viewform",
    },
  ] satisfies Omit<NewQuest, "hackathonId">[],
};