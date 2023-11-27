'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { Button, TextInput } from '@tremor/react';
import { authenticate } from '../lib/actions';

export default function LoginForm() {
    const [code, action] = useFormState(authenticate, undefined);
    const { pending } = useFormStatus();

    return (
        <div className="w-full p-4 md:w-6/12 lg:w-3/12">
            <header className="text-center">
                <h1 className="mb-3 text-2xl text-center font-bold">
                    Login to your account
                </h1>
                <h2 className="text-gray-500">Provide credentials to login</h2>
            </header>
            <form className="space-y-3" action={action}>
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-sm font-medium text-gray-900"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <TextInput
                        type="email"
                        id="email"
                        name="email"
                        className="py-1"
                        placeholder="Enter your email address"
                        icon={AtSymbolIcon}
                        required
                    />
                </div>
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-sm font-medium text-gray-900"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <TextInput
                        type="password"
                        id="password"
                        name="password"
                        className="py-1"
                        placeholder="Enter your password"
                        icon={KeyIcon}
                        required
                    />
                </div>
                <Button
                    size="xl"
                    className="w-full font-bold"
                    aria-disabled={pending}
                    loading={pending}
                    icon={ArrowRightIcon}
                    iconPosition="right"
                >
                    Submit
                </Button>
                <div className="flex h-8 items-end space-x-1">
                    {code === 'CredentialSignin' && (
                        <p className="text-red-500 flex items-center gap-1">
                            <ExclamationCircleIcon className="h-5 w-5 " />
                            <span>Invalid credentials, try again.</span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
