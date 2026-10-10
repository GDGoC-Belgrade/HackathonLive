import type { NewQuest } from "../../../schema";

export const demoQuests = [
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
] satisfies Omit<NewQuest, "hackathonId">[];
