export interface Quest {
  id: number;
  hackathonId: number;
  title: string;
  description: string | null;
  category: string;
  googleFormUrl: string;
}