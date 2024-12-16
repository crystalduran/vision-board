/**
 * Exports an HTML Element as an image with flexible options
 */

export const exportElementAsImage = async (element: HTMLElement, options?: { fileName?: string; format?: 'png' | 'jpeg'; scale?: number; }): Promise<void> => {
    const {
        fileName = 'exported-image',
        format = 'png',
        scale = 2 
    } = options || {};

    try {
        const html2canvas = await import('html2canvas');

        // render canvas with high quality and scaling
        const canvas = await html2canvas.default(element, {
            scale: scale,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: null // Transparent background
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