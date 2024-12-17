import { useState, useCallback } from 'react';

/**
 * Custom hook to manage input length tracking
 * @param {number} maxLength maximum length for the input
 * @param {string} initialValue optional initial value for the input
 * @returns {object} an object with input management utilities
 */

interface UseInputLengthParams {
    maxLength: number;
    initialValue?: string;
}

export const useInputLength = ({ maxLength, initialValue = ''}: UseInputLengthParams) => {
    const [value, setValue] = useState(initialValue);

    // useCallback is a React Hook that lets you cache a function definition between re-renders.
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // only update if the new value is within the max length
        if (newValue.length <= maxLength) {
            setValue(newValue);
        }
    }, [maxLength]);

    const remainingCharacters = maxLength - value.length;

    return {
        value,
        handleChange,
        remainingCharacters,
        maxLength
    };
};