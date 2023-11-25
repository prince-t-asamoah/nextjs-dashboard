import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/dashboard/(overview)/data';
import { Card, List, ListItem } from '@tremor/react';

export default async function LatestInvoices() {
    const latestInvoices = await fetchLatestInvoices();

    return (
        <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
            <h2 className="text-lg font-semibold py-5">Latest Invoices</h2>
            <Card>
                <List>
                    {latestInvoices.map((invoice) => (
                        <ListItem key={invoice.id}>
                            <Image
                                src={invoice.image_url}
                                alt={`${invoice.name}'s profile picture`}
                                className="mr-4 rounded-full"
                                width={32}
                                height={32}
                            />
                            <div className="flex flex-grow md:flex-col">
                                <p className="truncate text-sm font-semibold md:text-base">
                                    {invoice.name}
                                </p>
                                <p className="hidden text-sm text-gray-500 sm:block">
                                    {invoice.email}
                                </p>
                            </div>
                            <p className="truncate text-sm font-medium md:text-base">
                                {invoice.amount}
                            </p>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </div>
    );
}
