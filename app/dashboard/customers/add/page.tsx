import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export default function AddCustomersPage() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: '/dashboard/customers' },
                    {
                        label: 'Add customers',
                        href: '/dashboard/customers/add',
                        active: true,
                    },
                ]}
            />
        </main>
    );
}
