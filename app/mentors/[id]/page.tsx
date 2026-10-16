'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import type { Mentor } from '@/db/schema';
import { MentorAvatar } from '@/app/components/MentorAvatar';

// Always goes to the list, so it also works when the page is opened from a shared link
const BackLink = () => (
  <Link
    href="/mentors"
    className="-ml-2 mb-4 inline-flex items-center gap-1 rounded-full px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
  >
    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
    All mentors
  </Link>
);

export default function MentorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  // null = još se učitava
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [error, setError] = useState<'not-found' | 'failed' | null>(null);

  useEffect(() => {
    fetch(`/api/mentors/${id}`)
      .then((res) => {
        // 400 = neispravan ID, 404 = mentor ne postoji
        if (res.status === 400 || res.status === 404) throw new Error('not-found');
        if (!res.ok) throw new Error('failed');
        return res.json();
      })
      .then(setMentor)
      .catch((err: Error) => setError(err.message === 'not-found' ? 'not-found' : 'failed'));
  }, [id]);

  if (!mentor) {
    const message =
      error === 'not-found'
        ? 'Mentor not found.'
        : error
          ? "Couldn't load mentor."
          : 'Loading mentor...';

    return (
      <div className="mx-auto max-w-md text-gray-900">
        <BackLink />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md text-gray-900">
      <BackLink />

      <div className="flex flex-col items-center text-center">
        <MentorAvatar name={mentor.name} imageUrl={mentor.imageUrl} size={112} className="mb-4" />
        <h1 className="text-2xl font-bold">{mentor.name}</h1>
        <p className="mt-1 text-gray-600">{mentor.role}</p>
        {mentor.company && (
          <p className="mt-1 font-medium text-brand-green">{mentor.company}</p>
        )}
      </div>

      {mentor.bio && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">About</h2>
          <p className="leading-relaxed text-gray-700">{mentor.bio}</p>
        </section>
      )}

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Contact</h2>
        <div className="flex flex-col gap-3">
          <a
            href={`mailto:${mentor.email}`}
            className="flex items-center gap-3 rounded-2xl bg-brand-blue/10 p-4 transition active:scale-[0.98]"
          >
            <Mail className="h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
            <span className="min-w-0 break-all">{mentor.email}</span>
          </a>
          {mentor.phoneNumber && (
            <a
              href={`tel:${mentor.phoneNumber.replace(/\s/g, '')}`}
              className="flex items-center gap-3 rounded-2xl bg-brand-green/10 p-4 transition active:scale-[0.98]"
            >
              <Phone className="h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
              <span>{mentor.phoneNumber}</span>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}