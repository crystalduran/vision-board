/**
 * function to display character count
 * @param currentLength the current length of the input
 * @param maxLength maximun allowed length
 * @returns formatted character count string
 */
export const getCharacterCountDisplay = (currentLength: number, maxLength: number): string => {
  return `${currentLength}/${maxLength}`;
};