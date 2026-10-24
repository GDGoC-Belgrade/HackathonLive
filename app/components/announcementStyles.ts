import { CalendarDays, Megaphone, TriangleAlert, type LucideIcon } from "lucide-react";

export type AnnouncementType = "info" | "warning" | "important";

export const announcementStyles: Record<
  AnnouncementType,
  { label: string; icon: LucideIcon; card: string; iconBox: string; text: string; badge: string }
> = {
  info: {
    label: "Info",
    icon: CalendarDays,
    card: "border-brand-blue bg-brand-blue/5",
    iconBox: "bg-brand-blue/15",
    text: "text-brand-blue",
    badge: "bg-brand-blue/15 text-brand-blue",
  },
  warning: {
    label: "Warning",
    icon: TriangleAlert,
    card: "border-brand-yellow bg-brand-yellow/10",
    iconBox: "bg-brand-yellow/25",
    text: "text-yellow-700",
    badge: "bg-brand-yellow/25 text-yellow-800",
  },
  important: {
    label: "Important",
    icon: Megaphone,
    card: "border-brand-red bg-brand-red/5",
    iconBox: "bg-brand-red/15",
    text: "text-brand-red",
    badge: "bg-brand-red/15 text-brand-red",
  },
};

export function formatAnnouncementDate(date: Date): string {
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Belgrade",
  });
}
