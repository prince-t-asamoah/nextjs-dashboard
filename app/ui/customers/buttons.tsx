import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCustomer, deleteInvoice } from '@/app/lib/actions';

export function AddCustomerButton() {
    return (
        <Link
            href="/dashboard/customers/add"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <PlusIcon className="h-5 md:mr-4" />
            <span className="hidden md:block">Add customers</span>
        </Link>
    );
}

export function UpdateCustomer({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/customers/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteCustomer({ id }: { id: string }) {
    const deleteCustomerById = deleteCustomer.bind(null, id);
    return (
        <form action={deleteCustomerById}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}
