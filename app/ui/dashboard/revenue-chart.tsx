import { fetchRevenue } from '@/app/dashboard/(overview)/data';
import { BarChart, Card } from '@tremor/react';

export default async function RevenueChart() {
    const revenue = await fetchRevenue();

    if (!revenue || revenue.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }

    const revenueData = revenue.map((revenuItem) => ({
        month: revenuItem.month,
        'Revenue growth in USD': revenuItem.revenue,
    }));

    return (
        <div className="w-full md:col-span-4">
            <h2 className="text-lg font-semibold py-5">Recent Revenue</h2>
            <Card>
                <BarChart
                    data={revenueData}
                    index="month"
                    categories={['Revenue growth in USD']}
                    colors={['blue']}
                    yAxisWidth={48}
                    showYAxis={false}
                />
            </Card>
        </div>
    );
}
