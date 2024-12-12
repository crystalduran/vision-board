import { useState } from 'react';
import { useFormContext } from '../../hooks/useFormContext';

export const LifestyleForm = () => {
    const { formData, updateFormData } = useFormContext();
    
    // initialize state with an array of 4 empty strings or existing lifestyle data (if I don't use this it doesn't work)
    const [statements, setStatements] = useState<string[]>(
        formData.lifestyle && formData.lifestyle.length > 0 
            ? formData.lifestyle 
            : ['', '']
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // extract the statement number from the input name
        const statementIndex = parseInt(name.replace('statement', '')) - 1;
        
        // create a new array with the updated statement
        const updatedStatements = [...statements];
        updatedStatements[statementIndex] = value;
        
        // update local state
        setStatements(updatedStatements);
        
        // update form context with the entire statements array
        updateFormData({ lifestyle: updatedStatements });
    };

    // array of specific placeholders
    const placeholders = [
        'e.g. I eat healthy and balanced meals',
        'e.g. I maintain a consistent fitness routine'
    ];

    return (
        <div>
            <h2>Visualize your lifestyle</h2>
            <label>Write 2 statements that depict your ideal daily habits.</label>
            {[1, 2].map((num) => (
                <input
                    key={`statement${num}`}
                    type="text"
                    name={`statement${num}`}
                    value={statements[num - 1]}
                    placeholder={placeholders[num - 1]}
                    onChange={handleChange}
                />
            ))}
        </div>
    );
}