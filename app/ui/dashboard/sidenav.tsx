import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';

export default function SideNav() {
    return (
        <aside className="bg-blue-900 w-full border-t md:border-0 rounded-t-2xl py-2.5 md:rounded-none sticky md:static bottom-0 z-10 md:bg-blue-900 md:h-full md:w-1/12 lg:w-2/12">
            <nav className="my-12 px-4 hidden md:block">
                <Link href="/" className="text-white">
                    <AcmeLogo />
                </Link>
            </nav>
            <NavLinks />
        </aside>
    );
}
