import { useFormContext } from "../../hooks/useFormContext";
import { useStableImageSort } from "../../hooks/useStableImageStor";
import { forwardRef } from "react";
import { FormData } from "../../interfaces/form";
import { Config } from "../../types/config";
import styles from './VisionBoard.module.css';

type VisionBoardProps = {
    config: Config;
};

/*The forwardRef function takes a component and returns a new component that can accept ref as a prop. The ref is passed as the second argument to the functional component.*/
export const VisionBoard = forwardRef<HTMLDivElement, VisionBoardProps>(({ config }: VisionBoardProps, ref) => {
    const { formData } = useFormContext();
    const { theme, fontSize, fontFamily, showStickers } = config;
    const currentTime = new Date()
    const year = currentTime.getFullYear() + 1;


    // generic shuffling function
    function shuffleArray<T>(array: T[]): T[] {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    // extract only the image arrays that are of type File[]
    const allImages: File[] = Object.keys(formData)
        .filter(key => key.startsWith('image'))
        .map(key => formData[key as keyof FormData])
        .filter((item) => Array.isArray(item) && item.every(i => i instanceof File))
        .flat();

    // prepare texts with constraints
    const allTexts = [
        formData.career ? `I am a ${formData.career}` : '',
        ...shuffleArray(formData.lifestyle).slice(0, 2),
        ...shuffleArray(formData.affirmations).slice(0, 2),
    ].filter(text => text);

    const allStickers = [...formData.stickers];

    // shuffle images for random display
    // const shuffledImages = shuffleArray(allImages);

    const sortedImages = useStableImageSort(allImages);

    return (
        <div ref={ref} className={styles.visionBoardContainer} style={{ backgroundColor: theme === 'light' ? 'white' : 'black' }}>
            <div className={styles.titleContainer}>
                <h1 style={{ color: theme === 'light' ? '#1E1E1E' : 'white' }}>{formData.name}'s Vision Board <span>{year}</span></h1>
                <h4 style={{ color: theme === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)' }}>{formData.mantra}</h4>
            </div>

            <div className={styles.gallery}>
                {allStickers.map((sticker, index) => {
                    const positions = [
                        { top: '22%', left: '30%' },
                        { top: '72%', left: '78%' },
                        { top: '60%', left: '10%' },
                    ];

                    // si hay más stickers que posiciones, repetir las posiciones
                    const { top, left } = positions[index % positions.length];

                    return (
                        <img
                            key={index}
                            className={styles.randomSticker}
                            src={URL.createObjectURL(sticker)}
                            alt={`Sticker ${index + 1}`}
                            style={{
                                top,
                                left,
                                display: showStickers === true ? 'inline' : 'none',
                            }}
                        />
                    );
                })}
                {allTexts.map((text, index) => {
                    const positions = [
                        { top: '22%', left: '20%' },
                        { top: '22%', left: '75%' },
                        { top: '50%', left: '15%' },
                        { top: '50%', left: '80%' },
                        { top: '80%', left: '42%' },
                    ];

                    // si hay más textos que posiciones, repetir las posiciones
                    const { top, left } = positions[index % positions.length];

                    return (
                        <div
                            key={index}
                            className={styles.randomText}
                            style={{
                                top,
                                left,
                                fontSize: fontSize === 'small' ? '14px' : fontSize === 'medium' ? '18px' : '20px',
                                fontFamily: fontFamily === 'default' ? 'Nunito, sans-serif' : fontFamily,
                                color: theme === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                                backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                            }}
                        >
                            {text}
                        </div>
                    );
                })}
                {sortedImages.map((image, index) => {
                    const columnCount = 6;
                    const column = index % columnCount; // columna actual (0, 1, 2, ...)
                    const row = Math.floor(index / columnCount); // fila actual (0, 1, 2, ...)

                    // alternates the height to the column and row (improve this because object-fit cover isn't support by html2canvas)
                    const height = (column % 2 === 0 && row % 2 === 0) || (column % 2 !== 0 && row % 2 !== 0)
                        ? '200px'
                        : '240px';

                    return (
                        <div
                            key={index}
                            className={styles.galleryItem}
                            style={{
                                height, 
                            }}
                        >
                            <img
                                className={styles.galleryItemImage}
                                src={URL.createObjectURL(image)}
                                alt={`Gallery ${index + 1}`}
                                style={{
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    );
                })}
            </div>

        </div>
    );
});
