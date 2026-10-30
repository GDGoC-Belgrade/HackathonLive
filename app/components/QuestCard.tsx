import {
  Bug,
  Coffee,
  Flag,
  Link2Off,
  MessageSquare,
  Users,
  type LucideIcon,
} from "lucide-react";

import { isValidGoogleFormUrl } from "@/lib/google-form-url";
import type { Quest } from "@/lib/types/quests";

const THEMES: { bg: string; text: string; border: string }[] = [
  { bg: "bg-brand-blue/10", text: "text-brand-blue", border: "border-brand-blue" },
  // Brand žuta je nečitljiva kao tekst na svetloj pozadini, pa tekst koristi tamniju nijansu
  { bg: "bg-brand-yellow/15", text: "text-yellow-700", border: "border-brand-yellow" },
  { bg: "bg-brand-red/10", text: "text-brand-red", border: "border-brand-red" },
  { bg: "bg-brand-green/10", text: "text-brand-green", border: "border-brand-green" },
];
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  social: Users,
  networking: Coffee,
  technical: Bug,
  feedback: MessageSquare,
};
const DEFAULT_ICON: LucideIcon = Flag;

const CARD_CLASS = "flex items-start gap-4 rounded-2xl border-l-4 bg-white p-4 shadow-sm";
const BUTTON_CLASS =
  "mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold";

interface QuestCardProps {
  quest: Quest;
  index: number;
}

export function QuestCard({ quest, index }: QuestCardProps) {
  const theme = THEMES[index % THEMES.length];
  const Icon = CATEGORY_ICONS[quest.category.toLowerCase()] ?? DEFAULT_ICON;
  const hasValidLink = isValidGoogleFormUrl(quest.googleFormUrl ?? "");

  const content = (
    <>
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.bg} ${theme.text}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        {/* Kada naslov i kategorija ne staju u isti red, kategorija prelazi ispod naslova */}
        <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
          <h2 className="min-w-0 font-semibold text-gray-900 break-words">{quest.title}</h2>
          {/* Kategorija stoji na mestu XP oznake iz dizajna */}
          <span
            className={`max-w-full truncate rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${theme.bg} ${theme.text}`}
            title={quest.category}
          >
            {quest.category}
          </span>
        </div>
        {quest.description && (
          <p className="mt-1 text-sm leading-5 text-gray-600 break-words">
            {quest.description}
          </p>
        )}
        {hasValidLink ? (
          <span className={`${BUTTON_CLASS} ${theme.bg} ${theme.text}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
            Open Quest
            <span className="sr-only">(opens in a new tab)</span>
          </span>
        ) : (
          <span className={`${BUTTON_CLASS} border border-gray-200 bg-white text-gray-500`}>
            <Link2Off className="h-4 w-4" aria-hidden="true" />
            Link unavailable
          </span>
        )}
      </div>
    </>
  );

  if (!hasValidLink) {
    return <div className={`${CARD_CLASS} ${theme.border}`}>{content}</div>;
  }

  return (
    <a
      href={quest.googleFormUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${CARD_CLASS} transition-colors hover:bg-gray-50 active:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${theme.border}`}
    >
      {content}
    </a>
  );
}
