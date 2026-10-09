import {
  Bug,
  Coffee,
  Flag,
  MessageSquare,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Quest } from "@/lib/mock/quests";


const THEMES: { bg: string; text: string; border: string }[] = [
  { bg: "bg-brand-blue/10", text: "text-brand-blue", border: "border-brand-blue" },
  { bg: "bg-brand-red/10", text: "text-brand-red", border: "border-brand-red" },
  { bg: "bg-brand-yellow/10", text: "text-brand-yellow", border: "border-brand-yellow" },
  { bg: "bg-brand-green/10", text: "text-brand-green", border: "border-brand-green" },
];
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Social: Users,
  Networking: Coffee,
  Challenge: Bug,
  Feedback: MessageSquare,
};
const DEFAULT_ICON: LucideIcon = Flag;

interface QuestCardProps {
  quest: Quest;
  index: number;
}

export function QuestCard({ quest, index }: QuestCardProps) {
  const theme = THEMES[index % THEMES.length];
  const Icon = CATEGORY_ICONS[quest.category] ?? DEFAULT_ICON;

  return (
    <a
      href={quest.googleFormUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-start gap-3 rounded-2xl border-b border-l-4 border-b-gray-200 bg-white p-4 transition-colors active:bg-gray-50 ${theme.border}`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${theme.bg} ${theme.text}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-gray-900">{quest.title}</h3>
        <p className="mt-1 text-sm leading-5 text-gray-600">
          {quest.description}
        </p>
        <span
          className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${theme.bg} ${theme.text}`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          Open Quest
        </span>
      </div>
    </a>
  );
}
