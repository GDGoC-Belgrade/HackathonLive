// Fields mirror the `mentors` table from BE3 so the mock can be swapped for the API later.
export interface Mentor {
  id: number;
  name: string;
  role: string;
  company?: string;
  bio?: string;
  imageUrl?: string;
  phoneNumber?: string;
  email: string;
  // Not in the BE3 schema yet – shown as expertise tags in the UI
  topics?: string[];
}

export const mockMentors: Mentor[] = [
  {
    id: 1,
    name: "Ana Petrović",
    role: "Senior Frontend Engineer",
    company: "Google",
    bio: "Ana builds large-scale web apps with React and TypeScript. Ask her about component architecture, performance and accessibility.",
    imageUrl: "https://i.pravatar.cc/300?img=47",
    phoneNumber: "+381 64 123 4567",
    email: "ana.petrovic@example.com",
    topics: ["React", "Web"],
  },
  {
    id: 2,
    name: "Marko Jovanović",
    role: "Senior GCP Architect",
    company: "Microsoft",
    bio: "Marko designs cloud infrastructure and CI/CD pipelines. He can help you deploy your project and pick the right services.",
    imageUrl: "https://i.pravatar.cc/300?img=12",
    phoneNumber: "+381 63 987 6543",
    email: "marko.jovanovic@example.com",
    topics: ["GCP", "DevOps"],
  },
  {
    id: 3,
    name: "Jelena Nikolić",
    role: "Product Designer",
    company: "Nordeus",
    bio: "Jelena focuses on UX research and mobile-first design. Bring her your wireframes and she will help you polish the user flow.",
    imageUrl: "https://i.pravatar.cc/300?img=32",
    phoneNumber: "+381 65 555 1212",
    email: "jelena.nikolic@example.com",
    topics: ["UI/UX", "Figma"],
  },
  {
    id: 4,
    name: "Stefan Ilić",
    role: "Machine Learning Engineer",
    company: "Microsoft Development Center Serbia",
    bio: "Stefan works on applied ML and LLM integrations. He can help you scope an AI feature that is realistic for a hackathon.",
    imageUrl: "https://i.pravatar.cc/300?img=53",
    phoneNumber: "+381 62 444 3322",
    email: "stefan.ilic@example.com",
    topics: ["AI/ML", "Python"],
  },
  {
    id: 5,
    name: "Milica Đorđević",
    role: "Backend Developer",
    company: "HTEC Group",
    bio: "Milica builds APIs with Node.js and PostgreSQL. Talk to her about data modelling, databases and API design.",
    phoneNumber: "+381 60 777 8899",
    email: "milica.djordjevic@example.com",
    topics: ["Node.js", "SQL"],
  },
  {
    id: 6,
    name: "Nikola Stanković",
    role: "Startup Founder & Pitch Coach",
    bio: "Nikola has founded two startups and coaches teams on pitching. Visit him before the final demos to sharpen your presentation.",
    imageUrl: "https://i.pravatar.cc/300?img=60",
    email: "nikola.stankovic@example.com",
    topics: ["Pitching"],
  },
];

export function getMockMentorById(id: number): Mentor | undefined {
  return mockMentors.find((mentor) => mentor.id === id);
}
