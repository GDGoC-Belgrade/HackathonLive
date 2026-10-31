export interface Mentor {
  id: number;
  hackathonId: number;
  name: string;
  role: string;
  company: string | null;
  bio: string | null;
  imageUrl: string | null;
  phoneNumber: string | null;
  email: string;
  // Opciono: API ga vraća tek posle BE4 S4
  linkedinUrl?: string | null;
}