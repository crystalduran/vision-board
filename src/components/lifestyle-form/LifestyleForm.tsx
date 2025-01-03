import { useFormContext } from '../../hooks/useFormContext';
import { useInputLength } from '../../hooks/useInputLength';
import { getCharacterCountDisplay } from '../../utils/getCharacterCountDisplay';
import { useEffect } from 'react';

export const LifestyleForm = () => {
    const { formData, updateFormData } = useFormContext();

    const statement1 = useInputLength({
        maxLength: 50,
        initialValue: formData.lifestyle?.[0] || '',
    });

    const statement2 = useInputLength({
        maxLength: 50,
        initialValue: formData.lifestyle?.[1] || '',
    });

    // Combined lifestyle values to update form context once
    const lifestyle = [statement1.value, statement2.value];

    useEffect(() => {
        // Check if values have actually changed to prevent unnecessary updates
        if (
            lifestyle[0] !== formData.lifestyle?.[0] ||
            lifestyle[1] !== formData.lifestyle?.[1]
        ) {
            updateFormData({ lifestyle });
        }
    }, [lifestyle, formData.lifestyle, updateFormData]);

    return (
        <div>
            <h2>Visualize your lifestyle</h2>
            <label>Write 2 statements that depict your ideal daily habits.</label>
            {/* Statement 1 */}
            <div className="textInput">
                <input
                    type="text"
                    name="statement1"
                    value={statement1.value}
                    placeholder="e.g. I eat healthy and balanced meals"
                    onChange={statement1.handleChange}
                />
                <p>{getCharacterCountDisplay(statement1.value.length, statement1.maxLength)}</p>
            </div>
            {/* Statement 2 */}
            <div className="textInput">
                <input
                    type="text"
                    name="statement2"
                    value={statement2.value}
                    placeholder="e.g. I maintain a consistent fitness routine"
                    onChange={statement2.handleChange}
                />
                <p>{getCharacterCountDisplay(statement2.value.length, statement2.maxLength)}</p>
            </div>
        </div>
    );
};
