import { useFormContext } from '../../hooks/useFormContext';
import { useImageUpload } from '../../hooks/useImageUpload';
import { useInputLength } from '../../hooks/useInputLength';
import { getCharacterCountDisplay } from '../../utils/getCharacterCountDisplay';
import '../../index.css';


export const CareerForm = () => {
    const { formData, updateFormData } = useFormContext();
    const careerInput = useInputLength({ maxLength: 30, initialValue: formData.career || '' });
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
            <div className='textInput'>
                <input
                    type="text"
                    name="career"
                    value={careerInput.value}
                    placeholder="e.g., Architect, Software Engineer, Artist"
                    onChange={(e) => {
                        careerInput.handleChange(e);
                        updateFormData({ career: e.target.value })
                    }}
                />
                <p>{getCharacterCountDisplay(careerInput.value.length, careerInput.maxLength)}</p>
            </div>

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