'use client';

import { useFormState } from 'react-dom';
import { AtSymbolIcon } from '@heroicons/react/20/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { updateCustomer } from '@/app/lib/actions';
import { Customer } from '@/app/lib/definitions';
import { Button } from '../button';
import UploadImage from './upload-image';
import ErrorMessage from '../error-message';

export default function EditCustomerForm({ customer }: { customer: Customer }) {
    const updateCustomerById = updateCustomer.bind(null, customer?.id);

    const [state, action] = useFormState(updateCustomerById, {
        errors: {},
        message: '',
    });

    return (
        <form action={action}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4 flex justify-center">
                    <UploadImage state={state} imageSrc={customer.image_url} />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-medium"
                    >
                        Name
                    </label>
                    <div className="relative">
                        <div className="relative">
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter fullname"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="fullName-error"
                                defaultValue={customer?.name}
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    {state.errors?.fullName && (
                        <ErrorMessage
                            id="fullName"
                            message={state.errors.fullName[0]}
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="email-error"
                                defaultValue={customer?.email}
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    {state.errors?.email && (
                        <ErrorMessage
                            id="email"
                            message={state.errors.email[0]}
                        />
                    )}
                </div>
                {state?.message && <ErrorMessage message={state.message} />}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
