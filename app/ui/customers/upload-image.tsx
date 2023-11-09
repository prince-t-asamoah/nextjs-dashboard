'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Image from 'next/image';

export default function UploadImage() {
    const [imageURL, setImageURL] = useState('');

    const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0]);
            setImageURL(url);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="w-40 h-40 bg-white rounded-full flex justify-center items-center">
                {imageURL ? (
                    <Image
                        src={imageURL}
                        alt="Profile image"
                        width={160}
                        height={160}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <UserCircleIcon className="text-gray-600" />
                )}
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
                onChange={handleInputOnChange}
            />
        </div>
    );
}
