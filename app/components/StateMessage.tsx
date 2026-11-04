import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  // Button or link shown under the text, e.g. "Try again"
  action?: ReactNode;
  tone?: 'neutral' | 'error';
}

// Centered message used for empty, error and not-found states
export const StateMessage = ({ icon: Icon, title, description, action, tone = 'neutral' }: Props) => (
  <div
    role={tone === 'error' ? 'alert' : 'status'}
    className="flex flex-col items-center px-4 py-12 text-center"
  >
    <div
      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
        tone === 'error' ? 'bg-brand-red/10 text-brand-red' : 'bg-gray-100 text-gray-500'
      }`}
    >
      <Icon className="h-7 w-7" aria-hidden="true" />
    </div>
    <h2 className="break-words text-lg font-semibold text-gray-900">{title}</h2>
    {description && <p className="mt-1 max-w-xs break-words text-sm text-gray-600">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);
