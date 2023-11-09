'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function UploadImage() {
    return (
        <div className="flex flex-col">
            <div className="w-40 h-40 bg-white rounded-full">
                <UserCircleIcon className="text-gray-600" />
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
    );
}
