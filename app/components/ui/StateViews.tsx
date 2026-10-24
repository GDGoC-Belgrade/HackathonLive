import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { ReactNode } from "react";

export function LoadingState({label='Loading...'}: {label?: string }) {
    return (
        <div role="status" className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400"/>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    );
}

export function ErrorState({title = 'Something went wrong', message, onRetry  
}:{title?: string; message?: string; onRetry?: ()=>void }) {
    return(
        <div role="alert" className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <AlertTriangle className="h-8 w-8 text-brand-red"/>
            <h2>{title}</h2>
            {message && <p className="text-sm text-gray-500">{message}</p>}
            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-1 min-h-11 rounded-full bg-brand-blue px-5"
                >
                    Retry
                </button>
            )}
        </div>
    );
}

export function EmptyState({title = 'Empty for now', message, action
}: {title?: string; message?: string; action?: ReactNode}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <Inbox className="h-8 w-8 text-gray-400"/>
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {message && <p className="text-sm text-gray-500">{message}</p>}
      {action}
    </div>
  );
}