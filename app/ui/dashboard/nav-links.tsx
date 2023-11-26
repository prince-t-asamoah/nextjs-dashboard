'use client';

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
    HomeIcon as ActiveHomeIcon,
    DocumentDuplicateIcon as ActiveDocumentDuplicateIcon,
    UserGroupIcon as ActiveUserGroupIcon,
} from '@heroicons/react/24/solid';
import { logOut } from '@/app/lib/actions';

const links = [
    {
        name: 'Home',
        href: '/dashboard',
        defaultIcon: HomeIcon,
        activeIcon: ActiveHomeIcon,
    },
    {
        name: 'Invoices',
        href: '/dashboard/invoices',
        defaultIcon: DocumentDuplicateIcon,
        activeIcon: ActiveDocumentDuplicateIcon,
    },
    {
        name: 'Customers',
        href: '/dashboard/customers',
        defaultIcon: UserGroupIcon,
        activeIcon: ActiveUserGroupIcon,
    },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="md:h-[80%]">
            <ul className="flex justify-evenly md:justify-start md:flex-col md:gap-3 lg:gap-2 md:h-full">
                {links.map((link) => {
                    const LinkIcon =
                        pathname === link.href
                            ? link.activeIcon
                            : link.defaultIcon;
                    return (
                        <li className="lg:px-4" key={link.name}>
                            <Link
                                href={link.href}
                                className={clsx(
                                    'text-white flex md:justify-center lg:justify-start lg:gap-2 p-2 lg:px-4 lg:border-0 lg:rounded-md lg:hover:bg-gray-500',
                                    {
                                        'border-b-[3px] md:border-b-0 lg:bg-gray-500 md:border-l-2':
                                            pathname === link.href,
                                    }
                                )}
                            >
                                <LinkIcon className="w-6" />
                                <span className="hidden lg:inline">
                                    {link.name}
                                </span>
                            </Link>
                        </li>
                    );
                })}
                <li className="lg:px-4 md:flex md:justify-center lg:justify-start md:mt-auto md:w-full">
                    <form action={logOut} className="md:w-full">
                        <button className="text-white p-2 lg:px-4 flex flex-grow items-center lg:gap-2 lg:hover:bg-gray-500 lg:rounded-md md:w-full md:justify-center lg:justify-start">
                            <ArrowLeftOnRectangleIcon className="w-6" />
                            <span className="hidden lg:block">Sign Out</span>
                        </button>
                    </form>
                </li>
            </ul>
        </nav>
    );
}
