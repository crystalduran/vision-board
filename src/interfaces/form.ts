export interface FormData {
    name: string;
    mantra: string;
    imagesHome: File[]; 
    career: string;
    imagesCareer: File[]; 
    lifestyle: string[];
    imagesOutfit: File[];
    affirmations: string[];
    imagesExperiences: File[];
    imageCar: File[];
    imagesTech: File[];
    imagesHealth: File[];
    imagesCustom: File[];
    stickers: File[];
}


export interface FormContextType  {
    formData: FormData;
    updateFormData: (newData: Partial<FormData>) => void;
    hasContextContent: () => boolean;
}