const config = {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
    API_URL: process.env.CLOUDINARY_API_URL || '',
    API_KEY: process.env.CLOUDINARY_API_KEY || '',
    API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};

const CLOUDINARY_URL = `${config.API_URL}/${config.CLOUD_NAME}/image/upload`;

export const uploadImage = async (imageFile: File) => {
    if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'ml_default');

        try {
            const response = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            });

            return await response.json();
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
};
