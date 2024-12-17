import { useFormContext } from '../../hooks/useFormContext';
import { useInputLength } from '../../hooks/useInputLength';
import { getCharacterCountDisplay } from '../../utils/getCharacterCountDisplay';

export const AffirmationsForm = () => {
    const { formData, updateFormData } = useFormContext();

    // Declare two separate variables for the statements
    const affirmation1 = useInputLength({
        maxLength: 50,
        initialValue: formData.affirmations?.[0] || '',
    });

    const affirmation2 = useInputLength({
        maxLength: 50,
        initialValue: formData.affirmations?.[1] || '',
    });

    const handleFormUpdate = () => {
        updateFormData({ affirmations: [affirmation1.value, affirmation2.value] });
    };

    return (
        <div>
            <h2>Empower your mind</h2>
            <label>Write positive statements to motivate your growth</label>
            {/* Affirmation 1 */}
            <div className='textInput'>
                <input
                    type="text"
                    name="affirmation1"
                    value={affirmation1.value}
                    placeholder="e.g. I am an academic genius"
                    onChange={(e) => {
                        affirmation1.handleChange(e);
                        handleFormUpdate();
                    }}
                />
                <p>{getCharacterCountDisplay(affirmation1.value.length, affirmation1.maxLength)}</p>
            </div>

            {/* Affirmation 2 */}
            <div className='textInput'>
                <input
                    type="text"
                    name="affirmation2"
                    value={affirmation2.value}
                    placeholder="e.g. Enjoy life"
                    onChange={(e) => {
                        affirmation2.handleChange(e);
                        handleFormUpdate();
                    }}
                />
                <p>{getCharacterCountDisplay(affirmation2.value.length, affirmation2.maxLength)}</p>
            </div>
        </div>
    );
}