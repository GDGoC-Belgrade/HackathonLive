export type AnnouncementType = "info" | "warning" | "important";

export interface Announcement {
  id: number;
  hackathonId: number;
  title: string;
  message: string;
  type: AnnouncementType;
  createdAt: Date;
  expiresAt: Date | null;
}