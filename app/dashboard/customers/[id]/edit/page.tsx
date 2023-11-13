import { Metadata } from 'next';
import EditCustomerForm from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export const metadata: Metadata = {
    title: 'Edit customer',
};

export default function EditCustomersPage({
    params,
}: {
    params: { id: string };
}) {
    const id = params.id ?? '';

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: '/dashboard/customers' },
                    {
                        label: 'Edit customer',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditCustomerForm />
        </main>
    );
}
