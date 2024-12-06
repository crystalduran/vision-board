import { useState, ReactNode  } from "react";
import { FormData } from "../interfaces/interfaces";
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
        imagesCareer: []
    });

    const updateFormData = (newData: Partial<FormData>) => {
        setFormData((prevData) => ({ ...prevData, ...newData }));
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};