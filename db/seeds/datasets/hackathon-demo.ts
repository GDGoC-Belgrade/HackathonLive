export const hackathonDemo = {
  hackathon: {
    name: "HackathonLive Demo",
    description: "Demo hackathon for local development",
    startDate: new Date("2026-10-10T08:00:00Z"),
    endDate: new Date("2026-10-12T18:00:00Z"),
    location: "Belgrade",
    status: "active" as const,
  },
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
};