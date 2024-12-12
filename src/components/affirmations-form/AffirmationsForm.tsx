import { useState } from 'react';
import { useFormContext } from '../../hooks/useFormContext';

export const AffirmationsForm = () => {
    const { formData, updateFormData } = useFormContext();
    
    // initialize state with an array of 4 empty strings or existing affirmations data (if I don't use this it doesn't work)
    const [affirmations, setAffirmations] = useState<string[]>(
        formData.affirmations && formData.affirmations.length > 0 
            ? formData.affirmations 
            : ['', '']
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // extract the affirmation number from the input name
        const affirmationIndex = parseInt(name.replace('affirmation', '')) - 1;
        
        const updatedAffirmations = [...affirmations];
        updatedAffirmations[affirmationIndex] = value;
        
        // update local state
        setAffirmations(updatedAffirmations);
        
        // update form context with the entire affirmations array
        updateFormData({ affirmations: updatedAffirmations });
    };

    // array of specific placeholders
    const placeholders = [
        'e.g. I am an academic genius',
        'e.g. Enjoy life'
    ];

    return (
        <div>
            <h2>Empower your mind</h2>
            <label>Write positive statements to motivate your growth</label>
            {[1, 2].map((num) => (
                <input
                    key={`affirmation${num}`}
                    type="text"
                    name={`affirmation${num}`}
                    value={affirmations[num - 1]}
                    placeholder={placeholders[num - 1]}
                    onChange={handleChange}
                />
            ))}
        </div>
    );
}