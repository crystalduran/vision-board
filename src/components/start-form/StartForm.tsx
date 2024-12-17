import { useFormContext } from '../../hooks/useFormContext';
import { useInputLength } from '../../hooks/useInputLength';
import { getCharacterCountDisplay } from '../../utils/getCharacterCountDisplay';

export const StartForm = () => {
    const { formData, updateFormData } = useFormContext();

    const nameInput = useInputLength({ maxLength: 30, initialValue: formData.name || '' });
    const mantraInput = useInputLength({ maxLength: 80, initialValue: formData.mantra || '' });

    return (
        <>
            <h2>Let's start with the foundation of your vision</h2>
            <label>Name</label>
            <div className='textInput'>
                <input
                    type="text"
                    name="name"
                    value={nameInput.value}
                    placeholder="Enter your name"
                    onChange={(e) => {
                        nameInput.handleChange(e);
                        updateFormData({ name: e.target.value });
                    }}
                />
                <p>{getCharacterCountDisplay(nameInput.value.length, nameInput.maxLength)}</p>
            </div>

            <label>Mantra</label>
            <div className='textInput'>
                <input
                    type="text"
                    name="mantra"
                    value={mantraInput.value}
                    placeholder="Enter your personal mantra..."
                    onChange={(e) => {
                        mantraInput.handleChange(e);
                        updateFormData({ mantra: e.target.value });
                    }}
                />
                <p>{getCharacterCountDisplay(mantraInput.value.length, mantraInput.maxLength)}</p>
            </div>


        </>
    );
}