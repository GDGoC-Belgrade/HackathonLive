'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import type { Mentor } from '@/db/schema';
import { MentorCard, MentorCardColor } from '@/app/components/MentorCard';

const CARD_COLORS: MentorCardColor[] = ['blue', 'yellow', 'red', 'green'];

interface Props {
  mentors: Mentor[];
}

export const MentorList = ({ mentors }: Props) => {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const filteredMentors = mentors.filter((mentor) =>
    [mentor.name, mentor.role, mentor.company, mentor.bio]
      .filter((value): value is string => Boolean(value))
      .some((value) => value.toLowerCase().includes(normalizedQuery)),
  );

  return (
    <>
      <label className="mb-5 flex items-center gap-2 rounded-full bg-gray-100 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-blue">
        <Search className="h-5 w-5 shrink-0 text-gray-500" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics, mentors or companies"
          aria-label="Search mentors"
          // text-base (16px) stops iOS Safari from zooming in on focus
          className="w-full bg-transparent text-base outline-none placeholder:text-sm placeholder:text-gray-500"
        />
      </label>

      {filteredMentors.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredMentors.map((mentor) => (
            // Color follows the mentor, so it stays the same while filtering
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              color={CARD_COLORS[mentors.indexOf(mentor) % CARD_COLORS.length]}
            />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-gray-500">No mentors match “{query}”.</p>
      )}
    </>
  );
};
