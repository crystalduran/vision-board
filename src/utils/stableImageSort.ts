/**
 * Creates a stable sort for files to ensure consistent ordering across re-renders
 * @param files - The original array of files
 * @returns Consistently ordered array of files
 */

export function stableImageSort(files: File[]): File[] {
    // create a stable sorting mechanism that doesn't rely on random values like the past function, improve this
    return [...files].sort((a, b) => {
        // use a combination of properties to create a unique, consistent sort
        const sortKey = (file: File) => {
            // combine multiple attributes to create a unique, consistent sort
            return `${file.name}-${file.size}-${file.type}`;
        };

        const keyA = sortKey(a);
        const keyB = sortKey(b);

        return keyA.localeCompare(keyB);
    });
}