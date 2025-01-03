import { useState, useCallback, useRef } from 'react';

interface UseInputLengthParams {
    maxLength: number;
    initialValue?: string;
}

export const useInputLength = ({ maxLength, initialValue = '' }: UseInputLengthParams) => {
    const [value, setValue] = useState(initialValue);

    // Use a ref to keep track of the value without triggering re-renders
    const valueRef = useRef(initialValue);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // only update if the new value is within the max length
        if (newValue.length <= maxLength) {
            valueRef.current = newValue; // Update the ref
            setValue(newValue); // Update the state
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
