import { useState } from 'react';
import { useFormContext } from './useFormContext';

/**
 * React hook to reuse the common image upload logic
 * @param files - Optional array of images files, maximum number of images and the formKey (e.g. 'imagesCareer')
 * @returns Returns the current images (images), the maximum number of images (maxImages), and the functions (handleImageChange, handleImagePreview, removeImage).
 */

interface UseImageUploadProps {
    initialImages?: File[];
    maxImages: number;
    formKey: keyof ReturnType<typeof useFormContext>['formData'];
}

export const useImageUpload = ({ initialImages = [], maxImages, formKey }: UseImageUploadProps) => {
    const { formData, updateFormData } = useFormContext();
    const [images, setImages] = useState<File[]>(
        formData[formKey] as File[] || initialImages
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const combinedFiles = [...images, ...newFiles];
            const limitedFiles = combinedFiles.slice(0, maxImages);

            setImages(limitedFiles);
            updateFormData({ [formKey]: limitedFiles });
        }
    };

    const handleImagePreview = (image: File) => {
        return URL.createObjectURL(image);
    };

    const removeImage = (indexToRemove: number) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages);
        updateFormData({ [formKey]: updatedImages });
    };

    return {
        images,
        maxImages,
        handleImageChange,
        handleImagePreview,
        removeImage
    };
};