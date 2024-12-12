import { useImageUpload } from '../../hooks/useImageUpload';
import '../../index.css';


export const StickersForm = () => {
    const {
        images,
        maxImages,
        handleImageChange,
        handleImagePreview,
        removeImage
    } = useImageUpload({
        maxImages: 3,
        formKey: 'stickers'
    });

    return (
        <>
            <h2>Customize the result</h2>
            <label>Add stickers to the vision board</label>
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
                            : `Upload stickers to give your style to the vision board. (3)
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