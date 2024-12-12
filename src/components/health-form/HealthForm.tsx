import { useState } from 'react';
import { useFormContext } from '../../hooks/useFormContext';
import '../../index.css';


export const HealthForm = () => {
    const { formData, updateFormData } = useFormContext();
    const [images, setImages] = useState<File[]>(formData.imagesHealth);

    const MAX_IMAGES = 2;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            // combina las nuevas imágenes con las existentes
            const combinedFiles = [...images, ...newFiles];
            const limitedFiles = combinedFiles.slice(0, MAX_IMAGES);
            setImages(limitedFiles);
            updateFormData({ imagesHealth: limitedFiles });
        }
    };

    const handleImagePreview = (image: File) => {
        return URL.createObjectURL(image);
    };

    const removeImage = (indexToRemove: number) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages);
        updateFormData({ imagesHealth: updatedImages });
    };

    return (
        <>
            <h2>Shape your best self</h2>
            <label>Add images that represent how you want to look and feel while training</label>
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
                            : `Upload 2 images that represent your future body.
PNG, SVG (rec. Aspect Ratio 1:1)`}
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