import { useState } from 'react';
import { useFormContext } from '../../hooks/useFormContext';
import '../../index.css';


export const CareerForm = () => {
    const { formData, updateFormData } = useFormContext();
    const [images, setImages] = useState<File[]>(formData.imagesCareer);
    const [career, setCareer] = useState<string>(formData.career);

    const MAX_IMAGES = 2;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const files = newFiles.slice(0, MAX_IMAGES - images.length);
            setImages(files);
            updateFormData({ imagesCareer: files });
        }
    };

    const handleImagePreview = (image: File) => {
        return URL.createObjectURL(image);
    };

    const removeImage = (indexToRemove: number) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages);
        updateFormData({ imagesCareer: updatedImages });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCareer(e.target.value);
        updateFormData({ career: e.target.value });
    };

    return (
        <>
            <h2>Envision your dream career</h2>
            <label>What is your dream career?</label>
            <input
                type="text"
                name="career"
                value={career}
                placeholder="e.g., Architect, Software Engineer, Artist"
                onChange={handleChange}
            />
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
                            : `Upload one or two images that represent your perfect house.
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