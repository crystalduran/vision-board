import { useState } from 'react';
import { useFormContext } from '../../hooks/useFormContext';
import '../../index.css';


export const CustomForm = () => {
    const { formData, updateFormData } = useFormContext();
    const [images, setImages] = useState<File[]>(formData.imagesCustom);

    const MAX_IMAGES = 5;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            // combina las nuevas imágenes con las existentes
            const combinedFiles = [...images, ...newFiles];
            const limitedFiles = combinedFiles.slice(0, MAX_IMAGES);
            setImages(limitedFiles);
            updateFormData({ imagesCustom: limitedFiles });
        }
    };

    const handleImagePreview = (image: File) => {
        return URL.createObjectURL(image);
    };

    const removeImage = (indexToRemove: number) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages);
        updateFormData({ imagesCustom: updatedImages });
    };

    return (
        <>
            <h2>Add your unique vision</h2>
            <label>Include images or ideas not covered in other sections to complete your vision board</label>
            <div className="images-upload-container">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ visibility: "hidden" }}
                    id="image-upload"
                    disabled={images.length >= MAX_IMAGES}
                />
                <label
                    htmlFor="image-upload"
                    style={images.length >= MAX_IMAGES ? { cursor: 'not-allowed' } : {}}
                    className='imageUpload-label'
                >
                    <img src={`${images.length >= MAX_IMAGES ? '/ImagePlusGray.svg' : '/ImagePlus.svg'}`} alt="Upload image" height={40} width={40} />
                    <p style={{ fontSize: '15px' }}>
                        {images.length >= MAX_IMAGES
                            ? 'Limit of images reached'
                            : `Upload 5 images that represent your unique goals or aspirations. PNG, JPG (rec. Aspect Ratio 1:1)`}
                    </p>
                </label>

                {images.length > 0 && (
                    <div className="images-container">
                        {images.map((image, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                                <img
                                    src={handleImagePreview(image)}
                                    alt={`Preview ${index + 1}`}
                                    className="image-uploaded"
                                />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="button-remove-image"
                                ><img src="/Cancel.png" alt="Remove image" width={24} height={24} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}