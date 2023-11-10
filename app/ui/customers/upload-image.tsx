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

    const handleRemoveImage = () => setImageURL('');

    return (
        <div className="flex flex-col items-center mt-4">
            <div className="w-32 h-32 bg-white rounded-full flex justify-center items-center">
                {imageURL ? (
                    <div className="relative group flex justify-center items-center">
                        <Image
                            src={imageURL}
                            alt="Profile image"
                            width={128}
                            height={128}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                ) : (
                    <UserCircleIcon className="text-gray-600" />
                )}
            </div>
            <div className="flex gap-4 my-4">
                <label
                    htmlFor="image_url"
                    className="text-gray-600 text-center p-2 text-sm font-medium lg:hover:bg-gray-200 lg:hover:cursor-pointer rounded-md bg-white"
                >
                    Upload image
                </label>
                <button
                    type="button"
                    className="text-gray-600 text-sm lg:hover:underline"
                    onClick={handleRemoveImage}
                >
                    Remove image
                </button>
                <input
                    id="image_url"
                    name="image_url"
                    type="file"
                    className="hidden"
                    aria-describedby="image-url-error"
                    onChange={handleInputOnChange}
                />
            </div>
        </div>
    );
}
