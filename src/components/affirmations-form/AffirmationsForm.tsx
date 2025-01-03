import { useEffect } from 'react';
import { useFormContext } from '../../hooks/useFormContext';
import { useInputLength } from '../../hooks/useInputLength';
import { getCharacterCountDisplay } from '../../utils/getCharacterCountDisplay';

export const AffirmationsForm = () => {
    const { formData, updateFormData } = useFormContext();

    const affirmation1 = useInputLength({
        maxLength: 50,
        initialValue: formData.affirmations?.[0] || '',
    });

    const affirmation2 = useInputLength({
        maxLength: 50,
        initialValue: formData.affirmations?.[1] || '',
    });

    // Combined affirmation values to update form context once
    const affirmation = [affirmation1.value, affirmation2.value];

    // Use a single useEffect to track changes and update formData
    useEffect(() => {
        // Only update formData if the affirmations have changed
        if (
            affirmation[0] !== formData.affirmations?.[0] ||
            affirmation[1] !== formData.affirmations?.[1]
        ) {
            updateFormData({ affirmations: affirmation });
        }
    }, [affirmation, formData.affirmations, updateFormData]);

    return (
        <div>
            <h2>Empower your mind</h2>
            <label>Write positive statements to motivate your growth</label>
            {/* Affirmation 1 */}
            <div className="textInput">
                <input
                    type="text"
                    name="affirmation1"
                    value={affirmation1.value}
                    placeholder="e.g. I am an academic genius"
                    onChange={affirmation1.handleChange}
                />
                <p>{getCharacterCountDisplay(affirmation1.value.length, affirmation1.maxLength)}</p>
            </div>

            {/* Affirmation 2 */}
            <div className="textInput">
                <input
                    type="text"
                    name="affirmation2"
                    value={affirmation2.value}
                    placeholder="e.g. Enjoy life"
                    onChange={affirmation2.handleChange}
                />
                <p>{getCharacterCountDisplay(affirmation2.value.length, affirmation2.maxLength)}</p>
            </div>
        </div>
    );
};
