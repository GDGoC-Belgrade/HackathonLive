'use client';

import { Clock, Flag, GraduationCap, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ITEMS=[
    {
        label: 'Home',
        href: '/',
        icon: Home,
        text: 'text-brand-blue',
        bg: 'bg-brand-blue/10'
    },
    {
        label: 'Quests',
        href: '/quests',
        icon: Flag,
        text: 'text-brand-red',
        bg: 'bg-brand-red/10'
    },
    {
        label: 'Schedule',
        href: '/schedule',
        icon: Clock,
        text: 'text-brand-yellow',
        bg: 'bg-brand-yellow/10'
    },
    {
        label: 'Mentors',
        href: '/mentors',
        icon: GraduationCap,
        text: 'text-brand-green',
        bg: 'bg-brand-green/10'
    }
];

const NavMenu = () => {
    
    const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)]">
        <div className="flex h-(--nav-height) items-stretch justify-around px-2">
            {ITEMS.map((item)=>{
                const Icon=item.icon;
                const isActive = item.href === '/'
                    ? pathname === '/'
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);


                return(
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5"
                    >
                        <div
                            className={`flex items-center justify-center w-12 h-7 rounded-full transition-colors ${
                                    isActive?
                                        item.bg:
                                        'bg-transparent'
                                }`}
                        >
                            <Icon
                                className={`w-6 h-6 transition-colors ${
                                        isActive? 
                                            item.text:
                                            'text-gray-500 group-hover:text-gray-700'
                                    }`}
                            >
                            </Icon>
                        </div>
                        <span
                            className={`text-[11px] mt-0.5 transition-colors ${
                                    isActive? 
                                        `${item.text} font-semibold`:
                                        'text-gray-500 font-normal group-hover:text-gray-700'
                                }`}
                        >
                            {item.label}
                        </span>
                    </Link>
                    
                );
            })}
        </div>
    </nav>
  )
}

export default NavMenu