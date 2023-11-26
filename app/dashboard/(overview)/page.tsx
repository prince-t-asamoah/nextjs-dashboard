import { Suspense } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import {
    CardSkeleton,
    LatestInvoicesSkeleton,
    RevenueChartSkeleton,
} from '@/app/ui/skeletons';
import SummaryCards from '../../ui/dashboard/cards';
import RevenueChart from '../../ui/dashboard/revenue-chart';
import LatestInvoices from '../../ui/dashboard/latest-invoices';

export default async function DashboardPage() {
    return (
        <main>
            <h1 className="font-bold flex items-center gap-2 py-2 text-2xl">
                <HomeIcon className="h-6 w-6" />
                <span>Home</span>
            </h1>
            <h2 className="text-lg font-semibold py-5">Overview</h2>
            <Suspense fallback={<CardSkeleton />}>
                <SummaryCards />
            </Suspense>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}
