import { useMemo } from "react";
import { stableImageSort } from "../utils/stableImageSort";
/**
 * React hook to maintain consistent file ordering
 * @param files - The original array of files
 * @returns Consistently ordered array of files
 */
export function useStableImageSort(files: File[]): File[] {
  return useMemo(() => {
    return stableImageSort(files);
  }, [files]);
}