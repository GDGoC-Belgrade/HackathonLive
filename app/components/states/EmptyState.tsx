import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  compact?: boolean;
  children?: ReactNode;
}

export const EmptyState = ({ icon: Icon, title, description, compact = false, children }: Props) => (
  <div
    className={`flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-center ${
      compact ? 'gap-1 px-4 py-5' : 'gap-2 px-6 py-10'
    }`}
  >
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
      <Icon className="h-5 w-5 text-gray-500" aria-hidden="true" />
    </div>
    <h3 className="font-semibold text-gray-900 break-words">{title}</h3>
    {description && <p className="max-w-xs text-sm text-gray-600 break-words">{description}</p>}
    {children}
  </div>
);
