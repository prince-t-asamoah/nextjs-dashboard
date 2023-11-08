import AddCustomerForm from '@/app/ui/customers/add-form';
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
            <AddCustomerForm />
        </main>
    );
}
