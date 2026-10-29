import { notFound } from 'next/navigation';
import { Briefcase, ExternalLink, Mail, Phone } from 'lucide-react';
import { getMentor } from '@/lib/services/mentors';
import { MentorAvatar } from '@/app/components/MentorAvatar';
import { MentorBackLink } from '@/app/components/MentorBackLink';
import { isValidLinkedinUrl } from '@/lib/linkedin-url';

export const dynamic = 'force-dynamic';

const MAX_POSTGRES_INT = 2147483647;

export default async function MentorDetailsPage({ params }: PageProps<'/mentors/[id]'>) {
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id) || Number(id) > MAX_POSTGRES_INT) {
    notFound();
  }

  const mentor = await getMentor(id);

  if (!mentor) {
    notFound();
  }

  const linkedinUrl = mentor.linkedinUrl ?? '';
  const hasLinkedin = isValidLinkedinUrl(linkedinUrl);

  return (
    <div className="mx-auto max-w-md text-gray-900">
      <MentorBackLink />

      <div className="flex flex-col items-center text-center">
        <MentorAvatar name={mentor.name} imageUrl={mentor.imageUrl} size={112} className="mb-4" />
        <h1 className="w-full break-words text-2xl font-bold">{mentor.name}</h1>
        <p className="mt-1 w-full break-words text-gray-600">{mentor.role}</p>
        {mentor.company && (
          <p className="mt-1 w-full break-words font-medium text-brand-green">{mentor.company}</p>
        )}
      </div>

      {mentor.bio && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">About</h2>
          {/* Keeps line breaks from the bio and wraps long words or links */}
          <p className="whitespace-pre-line wrap-anywhere leading-relaxed text-gray-700">{mentor.bio}</p>
        </section>
      )}

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Contact</h2>
        <div className="flex flex-col gap-3">
          <a
            href={`mailto:${mentor.email}`}
            className="flex min-h-14 items-center gap-3 rounded-2xl bg-brand-blue/10 p-4 transition active:scale-[0.98]"
          >
            <Mail className="h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
            <span className="min-w-0 wrap-anywhere">{mentor.email}</span>
          </a>
          {mentor.phoneNumber && (
            <a

              href={`tel:${mentor.phoneNumber.replace(/[^\d+]/g, '')}`}
              className="flex min-h-14 items-center gap-3 rounded-2xl bg-brand-green/10 p-4 transition active:scale-[0.98]"
            >
              <Phone className="h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
              <span className="min-w-0 wrap-anywhere">{mentor.phoneNumber}</span>
            </a>
          )}
          {hasLinkedin && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${mentor.name} on LinkedIn (opens in a new tab)`}
              className="flex min-h-14 items-center gap-3 rounded-2xl bg-brand-yellow/10 p-4 transition active:scale-[0.98]"
            >
              <Briefcase className="h-5 w-5 shrink-0 text-brand-yellow" aria-hidden="true" />
              <span className="min-w-0 flex-1">LinkedIn profile</span>
              <ExternalLink className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
