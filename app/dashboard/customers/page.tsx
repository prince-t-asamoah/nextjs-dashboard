import { Suspense } from 'react';

import { PageSearchParams } from '@/app/lib/definitions';
import { AddCustomerButton } from '@/app/ui/customers/buttons';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { CustomerTableSkeleton } from '@/app/ui/skeletons';
import { fetchCustomersTotal } from './data';

export default async function CustomersPage({
    searchParams,
}: PageSearchParams) {
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page ?? '1');
    const totalPages = await fetchCustomersTotal();

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search customers by name or email" />
                <AddCustomerButton />
            </div>
            <Suspense fallback={<CustomerTableSkeleton />}>
                <CustomersTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
