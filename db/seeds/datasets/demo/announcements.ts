export const demoAnnouncements = [
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
];
