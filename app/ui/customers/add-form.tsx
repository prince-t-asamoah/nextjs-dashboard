import { AtSymbolIcon } from '@heroicons/react/20/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../button';

export default function AddCustomerForm() {
    return (
        <form>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4 flex justify-center">
                    <div className="flex flex-col">
                        <div className="w-40 h-40 bg-white rounded-full">
                            <UserCircleIcon className='text-gray-600'/>
                        </div>
                        <label
                            htmlFor="image_url"
                            className="text-gray-600 text-center my-2 py-2 text-sm font-medium lg:hover:bg-gray-200 lg:hover:cursor-pointer rounded-md bg-white"
                        >
                            Upload image
                        </label>
                        <input
                            id="image_url"
                            name="image_url"
                            type="file"
                            className="hidden"
                            aria-describedby="image-url-error"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Name
                    </label>
                    <div className="relative">
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter fullname"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="name-error"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
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
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Add customer</Button>
            </div>
        </form>
    );
}
