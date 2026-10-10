// Mock data for Sprint 1 of the Quests feature.
// Backend/DB integration is out of scope for this sprint — the shape mirrors
// db/schema/quests.ts (title, description, category, googleFormUrl) so the
// swap to a real fetch (e.g. db/queries/quests.ts) later is a drop-in.

export interface Quest {
  id: number;
  title: string;
  category: string;
  description: string;
  googleFormUrl: string;
}

export const mockQuests: Quest[] = [
  {
    id: 1,
    title: "Selfie Squad",
    category: "Social",
    description:
      "Take a photo with another team wearing a different colored badge.",
    googleFormUrl: "https://forms.gle/selfie-squad",
  },
  {
    id: 2,
    title: "Caffeine Chat",
    category: "Networking",
    description:
      "Grab a coffee with a mentor and ask them about their favorite tech stack.",
    googleFormUrl: "https://forms.gle/caffeine-chat",
  },
  {
    id: 3,
    title: "Bug Hunter",
    category: "Challenge",
    description: "Find the hidden QR code in the workshop slides.",
    googleFormUrl: "https://forms.gle/bug-hunter",
  },
  {
    id: 4,
    title: "Feedback Loop",
    category: "Feedback",
    description: "Submit feedback for the morning keynote session.",
    googleFormUrl: "https://forms.gle/feedback-loop",
  },
];
