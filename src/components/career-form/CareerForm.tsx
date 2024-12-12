import { useState } from 'react';
import { useFormContext } from '../../hooks/useFormContext';
import { useImageUpload } from '../../hooks/useImageUpload';
import '../../index.css';


export const CareerForm = () => {
    const { formData, updateFormData } = useFormContext();
    const [career, setCareer] = useState<string>(formData.career);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCareer(e.target.value);
        updateFormData({ career: e.target.value });
    };

    const {
        images,
        maxImages,
        handleImageChange,
        handleImagePreview,
        removeImage
    } = useImageUpload({
        maxImages: 2,
        formKey: 'imagesCareer'
    });

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
                    disabled={images.length >= maxImages}
                />
                <label
                    htmlFor="image-upload"
                    style={images.length >= maxImages ? { cursor: 'not-allowed' } : {}}
                    className='imageUpload-label'
                >
                    <img src={`${images.length >= maxImages ? '/ImagePlusGray.svg' : '/ImagePlus.svg'}`} alt="Upload image" height={40} width={40} />
                    <p style={{ fontSize: '15px' }}>
                        {images.length >= maxImages
                            ? 'Limit of images reached'
                            : `Upload two images that represent your career or your work.
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