'use client';

import { useRouter } from "next/navigation";
import { ErrorState } from "./components/ui/StateViews";
import { startTransition } from "react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
    const router = useRouter();
    const retry = ()=>{
        startTransition(()=>{
            router.refresh();
            reset();
        });
    };
  
    return <ErrorState onRetry={retry} />;
}