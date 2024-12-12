import { useState } from 'react';
import { useFormContext } from '../../hooks/useFormContext';
import '../../index.css';


export const OutfitsForms = () => {
    const { formData, updateFormData } = useFormContext();
    const [images, setImages] = useState<File[]>(formData.imagesOutfit);

    const MAX_IMAGES = 6;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const combinedFiles = [...images, ...newFiles];
            const limitedFiles = combinedFiles.slice(0, MAX_IMAGES);
            setImages(limitedFiles);
            updateFormData({ imagesOutfit: limitedFiles });
        }
    };

    const handleImagePreview = (image: File) => {
        return URL.createObjectURL(image);
    }

    const removeImage = (indexToRemove: number) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages);
        updateFormData({ imagesOutfit: updatedImages });
    }

    return (
        <>
            <h2>Create your fashion vision</h2>
            <label>Choose the ideal outfits (6) you will wear</label>
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
                            : `Add 6 images to represent what your outfits will look like
JPG, PNG, SVG (rec. 9:16 aspect ratio)`}
                    </p>
                </label>

                {images.length > 0 && (
                    <div className="images-container-large">
                        {images.map((image, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                                <img
                                    src={handleImagePreview(image)}
                                    alt={`Preview ${index + 1}`}
                                    className="image-uploaded-large"
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