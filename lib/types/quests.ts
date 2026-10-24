export interface Quest {
  id: number;
  title: string;
  description: string | null;
  category: string;
  googleFormUrl: string;
}