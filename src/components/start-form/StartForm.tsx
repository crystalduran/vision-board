import { useState } from 'react';
import { useFormContext } from '../../hooks/useFormContext';

export const StartForm = () => {
    const { formData, updateFormData } = useFormContext();
    const [formValues, setFormValues] = useState({
        name: formData.name || '',
        mantra: formData.mantra || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Actualiza el estado local
        setFormValues((prev) => ({ ...prev, [name]: value }));

        // Actualiza el contexto
        updateFormData({ [name]: value });
    };

    return (
        <>
            <h2>Let's start with the foundation of your vision</h2>
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={formValues.name}
                placeholder="Enter your name"
                onChange={handleChange}
            />
            <label>Mantra</label>
            <input
                type="text"
                name="mantra"
                value={formValues.mantra}
                placeholder="Enter your personal mantra..."
                onChange={handleChange}
            />

        </>
    );
}