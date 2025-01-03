import html2canvas from "html2canvas-objectfit-fix";

export const exportElementAsImage = async (element: HTMLElement, options?: { fileName?: string; format?: 'png' | 'jpeg'; scale?: number; }): Promise<void> => {
    const {
        fileName = 'exported-image',
        format = 'png',
        scale = 2
    } = options || {};

    try {
        // Render the canvas with high quality and scaling, passing options
        const canvas = await html2canvas(element, {
            scale: scale, // Scale option for quality
            useCORS: true, // For handling cross-origin images,
            allowTaint: true,
            logging: false,
            backgroundColor: null
        });

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL(`image/${format}`);

        // Create download link
        const link = document.createElement('a');
        link.download = `${fileName}.${format}`;
        link.href = dataUrl;
        link.click();

    } catch (error) {
        console.error('Error exporting element as image:', error);
        throw error;
    }
};
