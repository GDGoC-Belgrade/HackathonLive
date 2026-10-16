'use client';

import { useEffect, useState } from 'react';
import type { Mentor } from '@/db/schema';
import { MentorList } from '@/app/components/MentorList';

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/mentors')
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(setMentors)
      .catch(() => setError(true));
  }, []);

  return (
    <div className="mx-auto max-w-md text-gray-900">
      <h1 className="mb-4 text-2xl font-bold">Connect with Mentors</h1>
        {error ? (
          <p className="text-sm text-gray-600">Couldn&apos;t load mentors.</p>
        ) : mentors === null ? (
          <p className="text-sm text-gray-600">Loading mentors...</p>
        ) : mentors.length === 0 ? (
          <p className="text-sm text-gray-600">No mentors available yet.</p>
        ) : (
          <MentorList mentors={mentors} />
        )}
    </div>
  );
}
