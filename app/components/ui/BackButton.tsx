'use client';

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {label?: string; fallbackHref?: string};

export default function BackButton({label = 'Back', fallbackHref = '/'}: Props) {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length>1) {
            router.back();
        }
        else {
            router.push(fallbackHref);
        }
    };

    return (
        <button
        onClick={handleBack}
        className="-m1-2 mb-2 inline-flex min-h-11 items-center gap-1 rounded-full">
            <ArrowLeft className="w-4 h-4"/>
            {label}
        </button>
    );
}

