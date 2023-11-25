import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
} from '@heroicons/react/24/outline';
import { Card, Flex, Metric, Text } from '@tremor/react';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/dashboard/(overview)/data';

const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
};

export default async function SummaryCards() {
    const cardData = await fetchCardData();

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
                title="Collected"
                value={cardData.totalPaidInvoices}
                type="collected"
            />
            <SummaryCard
                title="Pending"
                value={cardData.totalPendingInvoices}
                type="pending"
            />
            <SummaryCard
                title="Total Invoices"
                value={cardData.numberOfInvoices}
                type="invoices"
            />
            <SummaryCard
                title="Total Customers"
                value={cardData.numberOfCustomers}
                type="customers"
            />
        </div>
    );
}

export function SummaryCard({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
    const Icon = iconMap[type];

    return (
        <Card>
            <Flex
                alignItems="center"
                justifyContent="start"
                className="mb-2 gap-2"
            >
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <Text>{title}</Text>
            </Flex>
            <Metric>{value}</Metric>
        </Card>
    );
}
