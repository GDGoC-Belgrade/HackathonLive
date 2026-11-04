import Link from "next/link";
import { SearchX } from "lucide-react";
import { BackLink } from "@/app/components/BackLink";
import { EmptyState } from "@/app/components/states/EmptyState";

export default function AnnouncementNotFound() {
  return (
    <div className="mx-auto max-w-md text-gray-900">
      <BackLink fallbackHref="/announcements" label="Back" />
      <EmptyState
        icon={SearchX}
        title="Announcement not found"
        description="It may have expired or the link is incorrect."
      >
        <Link
          href="/announcements"
          className="mt-3 rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white active:scale-95"
        >
          View all announcements
        </Link>
      </EmptyState>
    </div>
  );
}
