export interface FormData {
    name: string;
    mantra: string;
    imagesHome: File[]; 
    career: string;
    imagesCareer: File[]; 
}


export interface FormContextType  {
    formData: FormData;
    updateFormData: (newData: Partial<FormData>) => void;}