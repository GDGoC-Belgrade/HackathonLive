import Link from 'next/link';
import { Mail } from 'lucide-react';
import type { Mentor } from '@/db/schema';
import { MentorAvatar } from '@/app/components/MentorAvatar';

export type MentorCardColor = 'blue' | 'yellow' | 'red' | 'green';

const cardColorMap: Record<MentorCardColor, string> = {
  blue: 'border-brand-blue bg-brand-blue/5',
  yellow: 'border-brand-yellow bg-brand-yellow/5',
  red: 'border-brand-red bg-brand-red/5',
  green: 'border-brand-green bg-brand-green/5',
};

const iconColorMap: Record<MentorCardColor, string> = {
  blue: 'text-brand-blue',
  yellow: 'text-brand-yellow',
  red: 'text-brand-red',
  green: 'text-brand-green',
};

interface Props {
  mentor: Mentor;
  color?: MentorCardColor;
}

export const MentorCard = ({ mentor, color = 'blue' }: Props) => {
  const iconColor = iconColorMap[color];

  return (
    <div
      className={`relative flex flex-col items-center rounded-2xl border-2 p-3 text-center text-gray-900 shadow-sm transition active:scale-[0.98] ${cardColorMap[color]}`}
    >
      <MentorAvatar name={mentor.name} imageUrl={mentor.imageUrl} size={72} className="mb-2" />

      {/* The ::after overlay makes the whole card clickable */}
      <Link
        href={`/mentors/${mentor.id}`}
        className="w-full font-semibold after:absolute after:inset-0 after:rounded-2xl"
      >
        <h3 className="truncate">{mentor.name}</h3>
      </Link>
      <p className="line-clamp-2 text-xs text-gray-600">{mentor.role}</p>
      {mentor.company && (
        <p className="w-full truncate text-xs font-medium text-gray-500">{mentor.company}</p>
      )}

      <div className="mt-3 flex w-full flex-col gap-1.5 text-left text-sm">
        <a
          href={`mailto:${mentor.email}`}
          className="relative z-10 -my-1.5 flex items-center gap-2 py-1.5 hover:underline"
        >
          <Mail className={`h-4 w-4 shrink-0 ${iconColor}`} aria-hidden="true" />
          <span>Email</span>
        </a>
      </div>
    </div>
  );
};
