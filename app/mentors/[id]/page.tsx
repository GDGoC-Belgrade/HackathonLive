import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { getMockMentorById, mockMentors } from '@/data/mockMentors';
import { MentorAvatar } from '@/app/components/MentorAvatar';

export function generateStaticParams() {
  return mockMentors.map((mentor) => ({ id: String(mentor.id) }));
}

export default async function MentorDetailsPage({ params }: PageProps<'/mentors/[id]'>) {
  const { id } = await params;
  const mentor = getMockMentorById(Number(id));

  if (!mentor) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-md text-gray-900">
      {/* Always goes to the list, so it also works when the page is opened from a shared link */}
      <Link
        href="/mentors"
        className="-ml-2 mb-4 inline-flex items-center gap-1 rounded-full px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        All mentors
      </Link>

      <div className="flex flex-col items-center text-center">
        <MentorAvatar name={mentor.name} imageUrl={mentor.imageUrl} size={112} className="mb-4" />
        <h1 className="text-2xl font-bold">{mentor.name}</h1>
        <p className="mt-1 text-gray-600">{mentor.role}</p>
        {mentor.company && (
          <p className="mt-1 font-medium text-brand-green">{mentor.company}</p>
        )}
        {mentor.topics && mentor.topics.length > 0 && (
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {mentor.topics.map((topic) => (
              <li
                key={topic}
                className="rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {topic}
              </li>
            ))}
          </ul>
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
