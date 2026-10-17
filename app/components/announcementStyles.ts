import { CalendarDays, Megaphone, Wifi, type LucideIcon } from "lucide-react";

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
    icon: Wifi,
    card: "border-brand-green bg-brand-green/5",
    iconBox: "bg-brand-green/15",
    text: "text-brand-green",
    badge: "bg-brand-green/15 text-brand-green",
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
