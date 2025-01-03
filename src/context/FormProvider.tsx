import { useState, ReactNode } from "react";
import { FormData } from "../interfaces/form";
import { FormContext } from "./FormContext";

interface FormProviderProps {
    children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        mantra: '',
        imagesHome: [],
        career: '',
        imagesCareer: [],
        lifestyle: [],
        imagesOutfit: [],
        affirmations: [],
        imagesExperiences: [],
        imageCar: [],
        imagesTech: [],
        imagesHealth: [],
        imagesCustom: [],
    });

    const updateFormData = (newData: Partial<FormData>) => {
        setFormData((prevData) => ({ ...prevData, ...newData }));
    };

    // utility function to check if context has something
    const hasContextContent = () => {
        // check string fields
        const stringFields: (keyof FormData)[] = [
            'name', 'mantra', 'career'
        ];
        const hasNonEmptyStrings = stringFields.some(
            field => formData[field] && formData[field] !== ''
        );

        // check array fields
        const arrayFields: (keyof FormData)[] = [
            'imagesHome', 'imagesCareer', 'lifestyle',
            'imagesOutfit', 'affirmations', 'imagesExperiences',
            'imageCar', 'imagesTech', 'imagesHealth',
            'imagesCustom'
        ];
        const hasNonEmptyArrays = arrayFields.some(
            field => formData[field] && formData[field].length > 0
        );

        return hasNonEmptyStrings || hasNonEmptyArrays;
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData, hasContextContent}}>
            {children}
        </FormContext.Provider>
    );
};