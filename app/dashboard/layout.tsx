import SideNav from '@/app/ui/dashboard/sidenav';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col md:flex-row-reverse md:overflow-hidden">
            <div className="flex-grow p-6 md:overflow-y-auto lg:p-12">
                {children}
            </div>
            <SideNav />
        </div>
    );
}
